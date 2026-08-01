(function (global) {
  "use strict";

  // 金額計算を画面・CSV・移行処理で共有し、端数規則の違いを防ぎます。
  function calculateProfit(salePrice, costPrice, shippingFee, feeRate) {
    const fee = Math.floor(salePrice * feeRate / 100);
    const profit = salePrice - fee - costPrice - shippingFee;
    const profitRate = salePrice === 0 ? 0 : profit / salePrice * 100;

    return { fee, profit, profitRate };
  }

  function normalizeAppMeta(meta, schemaVersion, nowText) {
    const source = meta && typeof meta === "object" && !Array.isArray(meta) ? meta : {};
    return {
      ...source,
      schemaVersion: Number.isInteger(source.schemaVersion) ? source.schemaVersion : 1,
      revision: Number.isInteger(source.revision) && source.revision >= 0 ? source.revision : 0,
      migratedAt: source.migratedAt || nowText,
      lastBackupAt: typeof source.lastBackupAt === "string" ? source.lastBackupAt : "",
      lastDataChangeAt: typeof source.lastDataChangeAt === "string" ? source.lastDataChangeAt : "",
      targetSchemaVersion: schemaVersion
    };
  }

  function toFiniteNumber(value, fallbackValue) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallbackValue;
  }

  function isStrictIsoDate(dateText) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText || "")) return false;
    const [year, month, day] = dateText.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year
      && date.getMonth() === month - 1
      && date.getDate() === day;
  }

  // 保存済みデータは、欠損している任意項目だけ0として扱い、異常値は勝手に補正せず隔離します。
  function getPersistedSaleInvalidReasons(record, salesChannels) {
    const reasons = [];
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      return ["商品データがオブジェクトではありません"];
    }

    if (!isStrictIsoDate(record.saleDate)) reasons.push("販売日が不正です");
    if (!salesChannels.includes(record.salesChannel)) reasons.push("販路が不正です");
    if (typeof record.itemName !== "string" || !record.itemName.trim()) reasons.push("商品名が空欄です");

    const salePrice = Number(record.salePrice);
    if (record.salePrice === "" || record.salePrice === null || record.salePrice === undefined
      || !Number.isFinite(salePrice) || salePrice < 1) {
      reasons.push("売値が不正です");
    }

    [
      { key: "costPrice", label: "仕入れ値" },
      { key: "shippingFee", label: "送料" }
    ].forEach(function (field) {
      const value = record[field.key];
      if (value === "" || value === null || value === undefined) return;
      const number = Number(value);
      if (!Number.isFinite(number) || number < 0) reasons.push(`${field.label}が不正です`);
    });

    const feeRateValue = record.feeRate;
    if (feeRateValue !== "" && feeRateValue !== null && feeRateValue !== undefined) {
      const feeRate = Number(feeRateValue);
      if (!Number.isFinite(feeRate) || feeRate < 0 || feeRate > 100) {
        reasons.push("販売手数料率が不正です");
      }
    }

    if (record.purchaseDate !== "" && record.purchaseDate !== null && record.purchaseDate !== undefined) {
      if (!isStrictIsoDate(record.purchaseDate)) {
        reasons.push("仕入日が不正です");
      } else if (isStrictIsoDate(record.saleDate) && record.purchaseDate > record.saleDate) {
        reasons.push("仕入日が販売日より後です");
      }
    }

    return reasons;
  }

  // v1の商品をv2へ移すときも、画像・メモ・将来追加された未知項目はそのまま残します。
  function normalizeSaleRecord(record, fallbackId, calculateDays) {
    const source = record && typeof record === "object" && !Array.isArray(record) ? record : {};
    const salePrice = toFiniteNumber(source.salePrice, 0);
    const costPrice = toFiniteNumber(source.costPrice, 0);
    const shippingFee = toFiniteNumber(source.shippingFee, 0);
    const feeRate = toFiniteNumber(source.feeRate, 0);
    const calculated = calculateProfit(salePrice, costPrice, shippingFee, feeRate);
    const saleDate = typeof source.saleDate === "string" ? source.saleDate : "";
    const purchaseDate = typeof source.purchaseDate === "string" ? source.purchaseDate : "";

    return {
      ...source,
      id: source.id ?? fallbackId,
      saleDate,
      purchaseDate,
      salesChannel: typeof source.salesChannel === "string" ? source.salesChannel : "",
      itemName: typeof source.itemName === "string" ? source.itemName : "",
      salePrice,
      costPrice,
      shippingFee,
      feeRate,
      fee: calculated.fee,
      profit: calculated.profit,
      profitRate: calculated.profitRate,
      saleDays: typeof calculateDays === "function" ? calculateDays(saleDate, purchaseDate) : null,
      imageData: typeof source.imageData === "string" ? source.imageData : "",
      memo: typeof source.memo === "string" ? source.memo : ""
    };
  }

  // 画面に出せない行も失わないよう、元の位置と内容を分けて保持します。
  function partitionRecords(records, getInvalidReasons, normalizeRecord) {
    const visibleRecords = [];
    const quarantinedRecords = [];

    records.forEach(function (record, index) {
      const reasons = getInvalidReasons(record);
      if (reasons.length > 0) {
        quarantinedRecords.push({ index, record, reasons });
        return;
      }
      visibleRecords.push(normalizeRecord(record, index));
    });

    return { visibleRecords, quarantinedRecords };
  }

  // 通常保存では隔離行を原文のまま戻し、登録や編集をきっかけに消えないようにします。
  function mergeQuarantinedRecords(visibleRecords, quarantinedRecords) {
    const mergedRecords = visibleRecords.slice();
    quarantinedRecords
      .slice()
      .sort(function (left, right) { return left.index - right.index; })
      .forEach(function (entry) {
        const insertIndex = Math.max(0, Math.min(entry.index, mergedRecords.length));
        mergedRecords.splice(insertIndex, 0, entry.record);
      });
    return mergedRecords;
  }

  // 表計算ソフトが文字列を数式として実行しないよう、危険な先頭文字だけを無害化します。
  function protectCsvText(value) {
    const text = String(value ?? "");
    return /^[ \u3000]*(?:[=+\-@]|\t|\r|\n)/.test(text) ? `'${text}` : text;
  }

  function escapeCsvCell(value, protectFormula) {
    const text = protectFormula ? protectCsvText(value) : String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  }

  // 引用符の位置まで検査する状態機械で、CSV全体を安全に分解します。
  function parseCsv(textValue) {
    const text = String(textValue ?? "").replace(/^\uFEFF/, "");
    const rows = [];
    let row = [];
    let cell = "";
    let state = "start";

    function finishCell() {
      row.push(cell);
      cell = "";
      state = "start";
    }

    function finishRow() {
      finishCell();
      if (row.some(function (value) { return value !== ""; })) rows.push(row);
      row = [];
    }

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];
      if (state === "quoted") {
        if (char === '"' && next === '"') {
          cell += '"';
          index += 1;
        } else if (char === '"') {
          state = "afterQuote";
        } else {
          cell += char;
        }
      } else if (state === "afterQuote") {
        if (char === ",") finishCell();
        else if (char === "\n" || char === "\r") {
          finishRow();
          if (char === "\r" && next === "\n") index += 1;
        } else {
          return { ok: false, rows: [], error: "閉じた引用符の後に不正な文字があります。" };
        }
      } else if (char === '"') {
        if (state !== "start" || cell !== "") return { ok: false, rows: [], error: "引用符の位置が正しくありません。" };
        state = "quoted";
      } else if (char === ",") {
        finishCell();
      } else if (char === "\n" || char === "\r") {
        finishRow();
        if (char === "\r" && next === "\n") index += 1;
      } else {
        cell += char;
        state = "plain";
      }
    }

    if (state === "quoted") return { ok: false, rows: [], error: "引用符が閉じられていません。" };
    if (cell !== "" || row.length > 0 || state === "afterQuote") finishRow();
    return { ok: true, rows, error: "" };
  }

  function getDuplicateHeaders(headers) {
    const seen = new Set();
    const duplicates = new Set();
    headers.forEach(function (header) {
      const name = String(header ?? "").trim();
      if (seen.has(name)) duplicates.add(name || "空欄");
      seen.add(name);
    });
    return Array.from(duplicates);
  }

  function estimateBase64Bytes(base64Text) {
    const clean = String(base64Text || "").replace(/\s/g, "");
    if (!clean) return 0;
    const padding = clean.endsWith("==") ? 2 : clean.endsWith("=") ? 1 : 0;
    return clean.length * 3 / 4 - padding;
  }

  // JSON復元では画像形式・Base64・実容量・先頭バイトをまとめて検査します。
  function validateImageDataUrl(dataUrl, maxBytes) {
    if (dataUrl === "" || dataUrl == null) return { ok: true, bytes: 0 };
    if (typeof dataUrl !== "string") return { ok: false, reason: "画像データが文字列ではありません" };
    const match = dataUrl.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
    if (!match || match[2].length % 4 !== 0) return { ok: false, reason: "画像形式またはBase64が正しくありません" };
    const mime = match[1];
    const base64 = match[2];
    const bytes = estimateBase64Bytes(base64);
    if (bytes > maxBytes) return { ok: false, reason: "画像容量が上限を超えています" };
    let binary;
    try {
      binary = typeof atob === "function" ? atob(base64) : Buffer.from(base64, "base64").toString("binary");
    } catch (error) {
      return { ok: false, reason: "Base64を読み取れません" };
    }
    const codes = Array.from(binary.slice(0, 12), function (char) { return char.charCodeAt(0); });
    const signatures = {
      jpeg: codes[0] === 0xff && codes[1] === 0xd8 && codes[2] === 0xff,
      png: codes[0] === 0x89 && codes[1] === 0x50 && codes[2] === 0x4e && codes[3] === 0x47,
      webp: binary.slice(0, 4) === "RIFF" && binary.slice(8, 12) === "WEBP"
    };
    return signatures[mime] ? { ok: true, bytes, mime } : { ok: false, reason: "画像形式と内容が一致しません" };
  }

  function insertAt(records, record, index) {
    const next = records.slice();
    next.splice(Math.max(0, Math.min(Number(index) || 0, next.length)), 0, record);
    return next;
  }

  function isFileSizeAllowed(size, maxBytes) {
    return Number.isFinite(size) && size >= 0 && size <= maxBytes;
  }

  function getContainedSize(width, height, maxSize) {
    const scale = Math.min(1, maxSize / width, maxSize / height);
    return { width: Math.round(width * scale), height: Math.round(height * scale) };
  }

  function buildBackupPayload(options) {
    return {
      backupVersion: options.backupVersion,
      createdAt: options.createdAt,
      appMeta: { ...options.appMeta },
      sales: mergeQuarantinedRecords(options.sales, options.quarantinedSales),
      collapsedSections: { ...options.collapsedSections }
    };
  }

  const api = {
    calculateProfit,
    normalizeAppMeta,
    normalizeSaleRecord,
    isStrictIsoDate,
    getPersistedSaleInvalidReasons,
    partitionRecords,
    mergeQuarantinedRecords,
    protectCsvText,
    escapeCsvCell,
    parseCsv,
    getDuplicateHeaders,
    estimateBase64Bytes,
    validateImageDataUrl,
    insertAt,
    isFileSizeAllowed,
    getContainedSize,
    buildBackupPayload
  };
  global.UsedClothesCore = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
