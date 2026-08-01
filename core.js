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

  const api = {
    calculateProfit,
    normalizeAppMeta,
    normalizeSaleRecord,
    partitionRecords,
    mergeQuarantinedRecords
  };
  global.UsedClothesCore = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
