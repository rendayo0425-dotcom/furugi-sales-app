// HTMLのフォームと、一覧を表示する場所を取得します
const form = document.getElementById("salesForm");
const salesList = document.getElementById("salesList");
const emptyMessage = document.getElementById("emptyMessage");
const itemCount = document.getElementById("itemCount");
const saleDateInput = document.getElementById("saleDate");
const purchaseDateInput = document.getElementById("purchaseDate");
const monthFilterInput = document.getElementById("monthFilter");
const totalSales = document.getElementById("totalSales");
const totalCost = document.getElementById("totalCost");
const totalShipping = document.getElementById("totalShipping");
const totalFee = document.getElementById("totalFee");
const totalProfit = document.getElementById("totalProfit");
const averageProfitRate = document.getElementById("averageProfitRate");
const summaryCount = document.getElementById("summaryCount");
const averageSalePrice = document.getElementById("averageSalePrice");
const averageCostPrice = document.getElementById("averageCostPrice");
const averageShippingFee = document.getElementById("averageShippingFee");
const averageFee = document.getElementById("averageFee");
const kpiFeeRate = document.getElementById("kpiFeeRate");
const kpiShippingRate = document.getElementById("kpiShippingRate");
const kpiCostRate = document.getElementById("kpiCostRate");
const averageProfit = document.getElementById("averageProfit");
const averageDeposit = document.getElementById("averageDeposit");
const averageSaleDays = document.getElementById("averageSaleDays");
const grossProfitRate = document.getElementById("grossProfitRate");
const weeklyReportList = document.getElementById("weeklyReportList");
const dailySalesList = document.getElementById("dailySalesList");
const channelSummaryList = document.getElementById("channelSummaryList");
const monthlySummaryList = document.getElementById("monthlySummaryList");
const summaryYearSelect = document.getElementById("summaryYearSelect");
const itemImageInput = document.getElementById("itemImage");
const imagePreviewWrap = document.getElementById("imagePreviewWrap");
const imagePreview = document.getElementById("imagePreview");
const removeImageButton = document.getElementById("removeImageButton");
const formTitle = document.getElementById("formTitle");
const editStatus = document.getElementById("editStatus");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const formError = document.getElementById("formError");
const exportCsvButton = document.getElementById("exportCsvButton");
const exportMonthCsvButton = document.getElementById("exportMonthCsvButton");
const deleteAllDataButton = document.getElementById("deleteAllDataButton");
const csvFileInput = document.getElementById("csvFileInput");
const dataManagementStatus = document.getElementById("dataManagementStatus");
const globalStatus = document.getElementById("globalStatus");
const exportJsonBackupButton = document.getElementById("exportJsonBackupButton");
const jsonBackupInput = document.getElementById("jsonBackupInput");
const csvImportPreview = document.getElementById("csvImportPreview");
const csvPreviewMode = document.getElementById("csvPreviewMode");
const csvValidCount = document.getElementById("csvValidCount");
const csvWarningCount = document.getElementById("csvWarningCount");
const csvInvalidCount = document.getElementById("csvInvalidCount");
const csvResultCount = document.getElementById("csvResultCount");
const csvReplaceWarning = document.getElementById("csvReplaceWarning");
const csvIssueList = document.getElementById("csvIssueList");
const confirmCsvImportButton = document.getElementById("confirmCsvImportButton");
const cancelCsvImportButton = document.getElementById("cancelCsvImportButton");
const searchInput = document.getElementById("searchInput");
const channelFilter = document.getElementById("channelFilter");
const sortSelect = document.getElementById("sortSelect");
const includeAiItemDetails = document.getElementById("includeAiItemDetails");
const includeAiMemos = document.getElementById("includeAiMemos");
const copyAiAnalysisButton = document.getElementById("copyAiAnalysisButton");
const refreshAiPreviewButton = document.getElementById("refreshAiPreviewButton");
const aiCopyStatus = document.getElementById("aiCopyStatus");
const aiAnalysisPreview = document.getElementById("aiAnalysisPreview");
// 新しいSPAの共通画面と、ホーム画面の表示場所です
const routeTitle = document.getElementById("routeTitle");
const appViews = Array.from(document.querySelectorAll(".app-view"));
const bottomNavLinks = Array.from(document.querySelectorAll(".bottom-nav a"));
const analysisTabLinks = Array.from(document.querySelectorAll(".analysis-tabs a"));
const homeSales = document.getElementById("homeSales");
const homeProfit = document.getElementById("homeProfit");
const homeProfitRate = document.getElementById("homeProfitRate");
const homeMedianSaleDays = document.getElementById("homeMedianSaleDays");
const homeWithin30Rate = document.getElementById("homeWithin30Rate");
const homeWithin90Rate = document.getElementById("homeWithin90Rate");
const homeRecentSales = document.getElementById("homeRecentSales");
const homeSalesChart = document.getElementById("homeSalesChart");
const homeTrendPeriod = document.getElementById("homeTrendPeriod");
const homeTrendTotal = document.getElementById("homeTrendTotal");
const weeklySummaryLabel = document.getElementById("weeklySummaryLabel");
const weeklySummarySales = document.getElementById("weeklySummarySales");
const weeklySummaryProfit = document.getElementById("weeklySummaryProfit");
const weeklySummaryRate = document.getElementById("weeklySummaryRate");
const weeklySummaryCount = document.getElementById("weeklySummaryCount");
const dailySummarySales = document.getElementById("dailySummarySales");
const dailySummaryProfit = document.getElementById("dailySummaryProfit");
const dailySummaryCount = document.getElementById("dailySummaryCount");
const channelCompositionChart = document.getElementById("channelCompositionChart");
const channelCompositionTotal = document.getElementById("channelCompositionTotal");
const channelCompositionLegend = document.getElementById("channelCompositionLegend");
const channelRateComparison = document.getElementById("channelRateComparison");
const monthlyChart = document.getElementById("monthlyChart");
const aiSummarySales = document.getElementById("aiSummarySales");
const aiSummaryProfit = document.getElementById("aiSummaryProfit");
const aiSummaryCount = document.getElementById("aiSummaryCount");
const placeholderSaleImage = document.getElementById("placeholderSaleImage");
const placeholderSaleMeta = document.getElementById("placeholderSaleMeta");
const placeholderSaleName = document.getElementById("placeholderSaleName");
const placeholderSalePrice = document.getElementById("placeholderSalePrice");
const placeholderSaleProfit = document.getElementById("placeholderSaleProfit");
const placeholderSaleProfitRate = document.getElementById("placeholderSaleProfitRate");
const placeholderEditButton = document.getElementById("placeholderEditButton");
const placeholderDeleteButton = document.getElementById("placeholderDeleteButton");
const saleDetailMissing = document.getElementById("saleDetailMissing");
const saleDetailContent = document.getElementById("saleDetailContent");
const detailSaleDate = document.getElementById("detailSaleDate");
const detailPurchaseDate = document.getElementById("detailPurchaseDate");
const detailSaleDays = document.getElementById("detailSaleDays");
const detailSalesChannel = document.getElementById("detailSalesChannel");
const detailCostPrice = document.getElementById("detailCostPrice");
const detailShippingFee = document.getElementById("detailShippingFee");
const detailFee = document.getElementById("detailFee");
const detailFeeRate = document.getElementById("detailFeeRate");
const detailMemo = document.getElementById("detailMemo");
const monthCsvButtonLabel = document.getElementById("monthCsvButtonLabel");
const importReviewFileName = document.getElementById("importReviewFileName");
const importReviewMode = document.getElementById("importReviewMode");
const importIssueCount = document.getElementById("importIssueCount");
const csvNoIssues = document.getElementById("csvNoIssues");
const csvReviewPanel = document.getElementById("csvReviewPanel");
const jsonReviewPanel = document.getElementById("jsonReviewPanel");
const jsonReviewCreatedAt = document.getElementById("jsonReviewCreatedAt");
const jsonReviewCount = document.getElementById("jsonReviewCount");
const jsonReviewImageCount = document.getElementById("jsonReviewImageCount");

// localStorageで使う保存名です
const STORAGE_KEY = "usedClothesSales";
const COLLAPSE_STORAGE_KEY = "usedClothesCollapsedSections";
const APP_META_STORAGE_KEY = "usedClothesAppMeta";
const APP_SCHEMA_VERSION = 1;
const BACKUP_VERSION = 1;

// localStorageが使えるブラウザかどうかを確認します
const canUseStorage = typeof localStorage !== "undefined";

// 登録済みデータを入れておく配列です
let sales = [];

// セクションごとの折りたたみ状態を入れておくオブジェクトです
let collapsedSections = {};

// CSVは検証後、確定ボタンを押すまでここに一時保存します
let pendingCsvImport = null;

// JSONも確認画面で確定するまで、検証済み内容をここに一時保存します
let pendingJsonRestore = null;

// CSVとJSONの古い読込結果が、新しい確認画面へ割り込まないよう共通番号を付けます
let importReadGeneration = 0;

// 共通通知を自動で閉じるタイマーです。保存失敗などのエラーは閉じずに残します
let globalStatusTimer = null;

// 保存データが壊れていた場合、元の文字列を誤って上書きしないための印です
let storageLoadBlocked = false;

// 編集中の商品idです。nullのときは新規登録モードです
let editingSaleId = null;

// 第4段階までの暫定商品詳細で表示している商品idです
let placeholderSaleId = null;

// 選択中の画像をリサイズしたBase64文字列として一時的に入れておきます
let resizedImageData = "";

// 画像リサイズが終わるまで待つためのPromiseです
let imageResizePromise = Promise.resolve("");

// 画像を選び直したとき、古いリサイズ結果を使わないための番号です
let imageSelectionId = 0;

// 編集中に「既存画像を削除する」と決めたかどうかを覚えておきます
let imageDeleteRequested = false;

// 販路別集計で表示する販路の一覧です
const salesChannels = ["メルカリメイン", "メルカリサブ", "ヤフー", "ラクマ"];
const weekdays = [
  { name: "日曜日", shortName: "日" },
  { name: "月曜日", shortName: "月" },
  { name: "火曜日", shortName: "火" },
  { name: "水曜日", shortName: "水" },
  { name: "木曜日", shortName: "木" },
  { name: "金曜日", shortName: "金" },
  { name: "土曜日", shortName: "土" }
];

// CSVに出力する列の名前です。画像データは重いので含めません
const csvHeaders = [
  "id",
  "販売日",
  "仕入日",
  "販路",
  "商品名",
  "売値",
  "仕入れ値",
  "送料",
  "販売手数料率",
  "手数料",
  "利益",
  "利益率",
  "販売日数",
  "メモ"
];

// 数字を「1,000円」のように見やすい円表示へ変換します
function formatYen(value) {
  return `${Math.round(value).toLocaleString()}円`;
}

// 数字を「25.5%」のように小数1桁のパーセント表示へ変換します
function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

// 今日の日付を「2026-06-02」のような入力しやすい形にします
function getTodayText() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 今日の月を「2026-06」のようなinput type="month"用の形にします
function getCurrentMonthText() {
  return getTodayText().slice(0, 7);
}

// 日付文字列を、時刻のズレが出にくい形でDateに変換します
function parseDateText(dateText) {
  if (!dateText) {
    return null;
  }

  return new Date(`${dateText}T00:00:00`);
}

// 仕入日から販売日までの日数を計算します。仕入日がない場合はnullにします
function calculateSaleDays(saleDate, purchaseDate) {
  const saleDateValue = parseDateText(saleDate);
  const purchaseDateValue = parseDateText(purchaseDate);

  if (!saleDateValue || !purchaseDateValue) {
    return null;
  }

  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  return Math.round((saleDateValue - purchaseDateValue) / oneDayMilliseconds);
}

// 販売日数を一覧で読みやすい文字にします
function formatSaleDays(saleDays) {
  return Number.isFinite(saleDays) ? `${saleDays}日` : "-";
}

// 平均販売日数を、小数1桁までの見やすい表示にします
function formatAverageSaleDays(value) {
  return Number.isFinite(value) ? `${value.toFixed(1)}日` : "-";
}

// 入力値から手数料、利益、利益率を計算します
function calculateProfit(salePrice, costPrice, shippingFee, feeRate) {
  const fee = salePrice * feeRate / 100;
  const profit = salePrice - fee - costPrice - shippingFee;
  const profitRate = salePrice === 0 ? 0 : profit / salePrice * 100;

  return {
    fee,
    profit,
    profitRate
  };
}

// JSONが壊れていてもアプリ全体を止めず、呼び出し側で安全に判断できるようにします
function safeParseJson(jsonText, fallbackValue = null) {
  if (!jsonText) {
    return { ok: true, value: fallbackValue };
  }

  try {
    return { ok: true, value: JSON.parse(jsonText) };
  } catch (error) {
    return { ok: false, value: fallbackValue, error };
  }
}

// 重要な操作結果を、現在どの画面を開いていても見える共通欄へ表示します
function showGlobalStatus(message, type = "success") {
  window.clearTimeout(globalStatusTimer);
  globalStatus.textContent = message;
  globalStatus.hidden = !message;
  globalStatus.classList.toggle("is-warning", type === "warning");
  globalStatus.classList.toggle("is-error", type === "error");

  if (message && type !== "error") {
    globalStatusTimer = window.setTimeout(function () {
      globalStatus.hidden = true;
    }, type === "warning" ? 8000 : 6000);
  }
}

// データ管理画面の状態欄と、全画面共通の通知を同じ内容にそろえます
function showDataManagementStatus(message, type = "success") {
  dataManagementStatus.textContent = message;
  dataManagementStatus.classList.toggle("is-warning", type === "warning");
  dataManagementStatus.classList.toggle("is-error", type === "error");
  showGlobalStatus(message, type);
}

// URLではidが文字列になるため、保存元の型に関係なく同じ基準で照合します
function getSaleIdKey(id) {
  return String(id ?? "");
}

function saleIdsMatch(firstId, secondId) {
  return getSaleIdKey(firstId) === getSaleIdKey(secondId);
}

// 空欄と0を区別しながら、有限な数値だけを返します
function parseOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function getFiniteNumber(value, fallbackValue = 0) {
  const numberValue = parseOptionalNumber(value);
  return numberValue === null ? fallbackValue : numberValue;
}

// YYYY-MM-DDとして実在する日付かを確認します
function isValidDateText(dateText) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText || "")) {
    return false;
  }

  const date = parseDateText(dateText);
  return Boolean(date) && !Number.isNaN(date.getTime());
}

// 日付の各部分をDateに戻した結果と照合し、2月30日なども除外します
function isStrictDateText(dateText) {
  if (!isValidDateText(dateText)) {
    return false;
  }

  const date = parseDateText(dateText);
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}` === dateText;
}

// 旧データの未知項目は残しつつ、現在必要な項目と計算値を安全に補います
function normalizeSaleRecord(record, fallbackId = Date.now()) {
  const source = record && typeof record === "object" ? record : {};
  const salePrice = getFiniteNumber(source.salePrice, 0);
  const costPrice = getFiniteNumber(source.costPrice, 0);
  const shippingFee = getFiniteNumber(source.shippingFee, 0);
  const feeRate = getFiniteNumber(source.feeRate, 0);
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
    // 0日も正しい値なので、truthy判定を使わず日付から再計算します
    saleDays: calculateSaleDays(saleDate, purchaseDate),
    imageData: typeof source.imageData === "string" ? source.imageData : "",
    memo: typeof source.memo === "string" ? source.memo : ""
  };
}

function createDefaultAppMeta() {
  return {
    schemaVersion: APP_SCHEMA_VERSION,
    migratedAt: new Date().toISOString()
  };
}

function loadAppMeta() {
  if (!canUseStorage) {
    return createDefaultAppMeta();
  }

  let savedMeta = null;

  try {
    savedMeta = localStorage.getItem(APP_META_STORAGE_KEY);
  } catch (error) {
    return createDefaultAppMeta();
  }

  const parsed = safeParseJson(savedMeta, null);

  if (!parsed.ok || !parsed.value || typeof parsed.value !== "object") {
    return createDefaultAppMeta();
  }

  return {
    ...parsed.value,
    schemaVersion: APP_SCHEMA_VERSION,
    migratedAt: parsed.value.migratedAt || new Date().toISOString()
  };
}

function saveAppMeta(appMeta) {
  if (!canUseStorage) {
    return true;
  }

  try {
    localStorage.setItem(APP_META_STORAGE_KEY, JSON.stringify(appMeta));
    return true;
  } catch (error) {
    showDataManagementStatus("アプリ情報を保存できませんでした。ブラウザの保存容量を確認してください。", "error");
    return false;
  }
}

// フォーム上部のエラー表示を消します
function clearFormErrors() {
  formError.style.display = "none";
  formError.innerHTML = "";
}

// 入力エラーを日本語でまとめて表示します
function showFormErrors(errors) {
  const list = document.createElement("ul");

  errors.forEach(function (errorText) {
    const item = document.createElement("li");
    item.textContent = errorText;
    list.appendChild(item);
  });

  formError.innerHTML = "";
  formError.appendChild(list);
  formError.style.display = "block";
  formError.scrollIntoView({ behavior: "smooth", block: "center" });
}

// 登録・更新前に、必須項目と数値の範囲を確認します
function validateSaleInput(values) {
  const errors = [];

  if (!values.saleDate) {
    errors.push("販売日を入力してください。");
  }

  if (values.purchaseDate && values.saleDate && calculateSaleDays(values.saleDate, values.purchaseDate) < 0) {
    errors.push("仕入日は販売日以前の日付を入力してください。");
  }

  if (!values.salesChannel) {
    errors.push("販路を選択してください。");
  }

  if (!values.itemName) {
    errors.push("商品名を入力してください。");
  }

  if (Number.isNaN(values.salePrice) || values.salePrice < 1) {
    errors.push("売値は1円以上で入力してください。");
  }

  if (Number.isNaN(values.costPrice) || values.costPrice < 0) {
    errors.push("仕入れ値は0円以上で入力してください。");
  }

  if (Number.isNaN(values.shippingFee) || values.shippingFee < 0) {
    errors.push("送料は0円以上で入力してください。");
  }

  if (Number.isNaN(values.feeRate) || values.feeRate < 0 || values.feeRate > 100) {
    errors.push("販売手数料率は0〜100の範囲で入力してください。");
  }

  return errors;
}

// CSV内でカンマや改行があっても崩れないように、値をダブルクォートで囲みます
function escapeCsvValue(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

// 1件の商品データをCSVの1行分に変換します
function saleToCsvRow(sale) {
  const saleDays = Number.isFinite(sale.saleDays)
    ? sale.saleDays
    : calculateSaleDays(sale.saleDate, sale.purchaseDate);

  return [
    sale.id,
    sale.saleDate,
    sale.purchaseDate || "",
    sale.salesChannel,
    sale.itemName,
    sale.salePrice,
    sale.costPrice,
    sale.shippingFee,
    sale.feeRate,
    sale.fee,
    sale.profit,
    sale.profitRate,
    formatSaleDays(saleDays),
    sale.memo
  ].map(escapeCsvValue).join(",");
}

// CSVテキストを作ります。Excelで開きやすいようにBOMも先頭に付けます
function buildCsvText(targetSales = sales) {
  const headerRow = csvHeaders.map(escapeCsvValue).join(",");
  const dataRows = targetSales.map(saleToCsvRow);

  return `\uFEFF${[headerRow, ...dataRows].join("\n")}`;
}

// CSVの1行を配列へ変換します
function parseCsvLine(line) {
  const values = [];
  let currentValue = "";
  let isInQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && isInQuotes && nextChar === '"') {
      currentValue += '"';
      index += 1;
    } else if (char === '"') {
      isInQuotes = !isInQuotes;
    } else if (char === "," && !isInQuotes) {
      values.push(currentValue);
      currentValue = "";
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue);
  return values;
}

// CSV全体を2次元配列へ変換します。引用符の中の改行も扱えるようにしています
function parseCsvText(csvText) {
  const rows = [];
  let currentLine = "";
  let isInQuotes = false;
  const text = csvText.replace(/^\uFEFF/, "");

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"' && isInQuotes && nextChar === '"') {
      currentLine += char + nextChar;
      index += 1;
    } else if (char === '"') {
      isInQuotes = !isInQuotes;
      currentLine += char;
    } else if ((char === "\n" || char === "\r") && !isInQuotes) {
      if (currentLine.trim() !== "") {
        rows.push(parseCsvLine(currentLine));
      }

      currentLine = "";

      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
    } else {
      currentLine += char;
    }
  }

  if (currentLine.trim() !== "") {
    rows.push(parseCsvLine(currentLine));
  }

  return rows;
}

function getCsvValue(headerIndexes, row, headerName) {
  const index = headerIndexes[headerName];
  return index === undefined ? "" : String(row[index] ?? "").trim();
}

function numbersDiffer(firstValue, secondValue, tolerance = 0.01) {
  return Math.abs(firstValue - secondValue) > tolerance;
}

// CSVの1行を検証し、登録可能なデータと警告を分けて返します
function validateCsvRow(headerIndexes, row, rowNumber) {
  const errors = [];
  const warnings = [];
  const saleDate = getCsvValue(headerIndexes, row, "販売日");
  const purchaseDate = getCsvValue(headerIndexes, row, "仕入日");
  const salesChannel = getCsvValue(headerIndexes, row, "販路");
  const itemName = getCsvValue(headerIndexes, row, "商品名");
  const salePrice = parseOptionalNumber(getCsvValue(headerIndexes, row, "売値"));
  const costText = getCsvValue(headerIndexes, row, "仕入れ値");
  const shippingText = getCsvValue(headerIndexes, row, "送料");
  const feeRateText = getCsvValue(headerIndexes, row, "販売手数料率");
  const costPrice = costText === "" ? 0 : parseOptionalNumber(costText);
  const shippingFee = shippingText === "" ? 0 : parseOptionalNumber(shippingText);
  const feeRate = feeRateText === "" ? 0 : parseOptionalNumber(feeRateText);

  if (!isStrictDateText(saleDate)) {
    errors.push("販売日が正しい日付ではありません");
  }

  if (purchaseDate && !isStrictDateText(purchaseDate)) {
    errors.push("仕入日が正しい日付ではありません");
  } else if (purchaseDate && saleDate && calculateSaleDays(saleDate, purchaseDate) < 0) {
    errors.push("仕入日が販売日より後です");
  }

  if (!salesChannels.includes(salesChannel)) {
    errors.push("販路が登録済みの選択肢ではありません");
  }

  if (!itemName) {
    errors.push("商品名が空欄です");
  }

  if (salePrice === null || salePrice < 1) {
    errors.push("売値は1円以上で入力してください");
  }

  if (costPrice === null || costPrice < 0) {
    errors.push("仕入れ値は0円以上で入力してください");
  }

  if (shippingFee === null || shippingFee < 0) {
    errors.push("送料は0円以上で入力してください");
  }

  if (feeRate === null || feeRate < 0 || feeRate > 100) {
    errors.push("販売手数料率は0〜100で入力してください");
  }

  if (errors.length > 0) {
    return { rowNumber, errors, warnings, sale: null };
  }

  const calculated = calculateProfit(salePrice, costPrice, shippingFee, feeRate);
  const importedFee = parseOptionalNumber(getCsvValue(headerIndexes, row, "手数料"));
  const importedProfit = parseOptionalNumber(getCsvValue(headerIndexes, row, "利益"));
  const importedProfitRate = parseOptionalNumber(getCsvValue(headerIndexes, row, "利益率"));
  const importedSaleDaysText = getCsvValue(headerIndexes, row, "販売日数").replace(/日$/, "");
  const importedSaleDays = parseOptionalNumber(importedSaleDaysText);
  const calculatedSaleDays = calculateSaleDays(saleDate, purchaseDate);

  if (importedFee !== null && numbersDiffer(importedFee, calculated.fee)) {
    warnings.push("手数料を入力値から再計算しました");
  }

  if (importedProfit !== null && numbersDiffer(importedProfit, calculated.profit)) {
    warnings.push("利益を入力値から再計算しました");
  }

  if (importedProfitRate !== null && numbersDiffer(importedProfitRate, calculated.profitRate)) {
    warnings.push("利益率を入力値から再計算しました");
  }

  if (importedSaleDays !== null && importedSaleDays !== calculatedSaleDays) {
    warnings.push("販売日数を販売日と仕入日から再計算しました");
  }

  // 数字だけでなく将来の文字列idも保ち、重複判定は後段で文字列に統一します
  const importedId = getCsvValue(headerIndexes, row, "id");
  const sale = normalizeSaleRecord({
    id: importedId || Date.now() + rowNumber,
    saleDate,
    purchaseDate,
    salesChannel,
    itemName,
    salePrice,
    costPrice,
    shippingFee,
    feeRate,
    imageData: "",
    memo: getCsvValue(headerIndexes, row, "メモ")
  }, Date.now() + rowNumber);

  return { rowNumber, errors, warnings, sale };
}

// 必須ヘッダーと各行を検証し、保存前のプレビュー用データを作ります
function validateCsvText(csvText) {
  const rows = parseCsvText(csvText);
  const headers = rows[0] || [];
  const requiredHeaders = ["販売日", "販路", "商品名", "売値"];
  const missingHeaders = requiredHeaders.filter(function (header) {
    return !headers.includes(header);
  });

  if (missingHeaders.length > 0) {
    return {
      sales: [],
      validCount: 0,
      warningCount: 0,
      invalidCount: Math.max(rows.length - 1, 0),
      issues: [`必須列がありません: ${missingHeaders.join("、")}`],
      fatalError: true
    };
  }

  const headerIndexes = {};
  headers.forEach(function (header, index) {
    headerIndexes[header] = index;
  });

  const results = rows.slice(1).map(function (row, index) {
    return validateCsvRow(headerIndexes, row, index + 2);
  });
  const acceptedRows = results.filter(function (result) {
    return result.sale;
  });
  const issues = [];

  results.forEach(function (result) {
    if (result.errors.length > 0) {
      issues.push(`${result.rowNumber}行目: ${result.errors.join("、")}`);
    } else if (result.warnings.length > 0) {
      issues.push(`${result.rowNumber}行目（警告）: ${result.warnings.join("、")}`);
    }
  });

  return {
    sales: acceptedRows.map(function (result) {
      return result.sale;
    }),
    validCount: acceptedRows.filter(function (result) {
      return result.warnings.length === 0;
    }).length,
    warningCount: acceptedRows.filter(function (result) {
      return result.warnings.length > 0;
    }).length,
    invalidCount: results.filter(function (result) {
      return !result.sale;
    }).length,
    issues,
    fatalError: false
  };
}

// 以前の呼び出しとの互換用に、検証を通った商品だけを返します
function csvTextToSales(csvText) {
  return validateCsvText(csvText).sales;
}

// 指定したデータをCSVファイルとしてダウンロードします
function downloadCsv(targetSales, fileName) {
  const csvText = buildCsvText(targetSales);
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// すべての登録データをCSVファイルとしてダウンロードします
function exportCsv() {
  if (sales.length === 0) {
    showDataManagementStatus("出力する売上データがありません。", "warning");
    alert("出力するデータがありません。");
    return;
  }

  downloadCsv(sales, `sales-data-${getTodayText()}.csv`);
  showDataManagementStatus(`全${sales.length}件のCSVを出力しました。`);
}

// 表示中の月に含まれるデータだけをCSVファイルとしてダウンロードします
function exportMonthCsv() {
  const selectedMonth = monthFilterInput.value;
  const monthlySales = sales.filter(function (sale) {
    return sale.saleDate && sale.saleDate.slice(0, 7) === selectedMonth;
  });

  if (monthlySales.length === 0) {
    showDataManagementStatus("この月のCSVへ出力できるデータがありません。", "warning");
    alert("この月のデータがありません。");
    return;
  }

  downloadCsv(monthlySales, `sales-data-${selectedMonth}.csv`);
  showDataManagementStatus(`${formatMonthLabel(selectedMonth)}の${monthlySales.length}件をCSVへ出力しました。`);
}

function countDuplicateSaleIds(targetSales) {
  const usedIds = new Set();
  let duplicateCount = 0;

  targetSales.forEach(function (sale) {
    const idKey = getSaleIdKey(sale.id);

    if (usedIds.has(idKey)) {
      duplicateCount += 1;
    } else {
      usedIds.add(idKey);
    }
  });

  return duplicateCount;
}

function createUniqueSaleId(usedIds, offset = 0) {
  let nextId = Date.now() + offset + Math.floor(Math.random() * 100000);

  while (usedIds.has(getSaleIdKey(nextId))) {
    nextId += 1;
  }

  return nextId;
}

// CSVと既存データのidを文字列で比べ、詳細URLが同じになる衝突を解消します
function ensureUniqueImportedIds(importedSales, baseSales) {
  const usedIds = new Set(baseSales.map(function (sale) {
    return getSaleIdKey(sale.id);
  }));

  return importedSales.map(function (sale, index) {
    let nextId = sale.id;
    let nextIdKey = getSaleIdKey(nextId);

    if (!nextIdKey || usedIds.has(nextIdKey)) {
      nextId = createUniqueSaleId(usedIds, index);
      nextIdKey = getSaleIdKey(nextId);
    }

    usedIds.add(nextIdKey);
    return { ...sale, id: nextId };
  });
}

function getSelectedCsvImportMode() {
  return document.querySelector("input[name='importMode']:checked").value;
}

function updateCsvImportPreview() {
  if (!pendingCsvImport) {
    return;
  }

  const importMode = getSelectedCsvImportMode();
  const isReplaceMode = importMode === "replace";
  const resultCount = isReplaceMode
    ? pendingCsvImport.sales.length
    : sales.length + pendingCsvImport.sales.length;

  csvPreviewMode.textContent = isReplaceMode ? "現在のデータを置き換える" : "現在のデータに追加する";
  importReviewMode.textContent = isReplaceMode ? "置き換え" : "追加";
  importReviewFileName.textContent = pendingCsvImport.fileName || "CSVファイル";
  csvValidCount.textContent = `${pendingCsvImport.validCount}件`;
  csvWarningCount.textContent = `${pendingCsvImport.warningCount}件`;
  csvInvalidCount.textContent = `${pendingCsvImport.invalidCount}件`;
  csvResultCount.textContent = `${resultCount}件`;
  csvReplaceWarning.hidden = !isReplaceMode;
  csvImportPreview.hidden = false;
  csvReviewPanel.hidden = false;
  jsonReviewPanel.hidden = true;
  csvIssueList.innerHTML = "";

  pendingCsvImport.issues.slice(0, 50).forEach(function (issueText) {
    const item = document.createElement("li");
    item.textContent = issueText;
    csvIssueList.appendChild(item);
  });

  if (pendingCsvImport.issues.length > 50) {
    const item = document.createElement("li");
    item.textContent = `ほか${pendingCsvImport.issues.length - 50}件`;
    csvIssueList.appendChild(item);
  }

  importIssueCount.textContent = `${pendingCsvImport.issues.length}件`;
  csvNoIssues.hidden = pendingCsvImport.issues.length > 0;
  confirmCsvImportButton.disabled = pendingCsvImport.sales.length === 0 || pendingCsvImport.fatalError;
  confirmCsvImportButton.textContent = "確認してCSVを読み込む";
}

function clearPendingCsvImport() {
  importReadGeneration += 1;
  pendingCsvImport = null;
  csvFileInput.disabled = false;
  csvFileInput.value = "";
  csvIssueList.innerHTML = "";
}

// CSVとJSONの一時データをまとめて破棄し、管理画面へ戻れる状態にします
function clearPendingImportReview() {
  importReadGeneration += 1;
  pendingCsvImport = null;
  pendingJsonRestore = null;
  csvFileInput.disabled = false;
  csvFileInput.value = "";
  csvIssueList.innerHTML = "";
  jsonBackupInput.disabled = false;
  jsonBackupInput.value = "";
  exportJsonBackupButton.disabled = storageLoadBlocked;
}

// CSVファイルは選択時に検証するだけで、確定ボタンを押すまで保存しません
function stageCsvImport(file) {
  const reader = new FileReader();
  const requestId = importReadGeneration + 1;
  importReadGeneration = requestId;
  pendingCsvImport = null;
  pendingJsonRestore = null;
  finalizeJsonRestoreControls();
  csvFileInput.disabled = true;
  showDataManagementStatus("CSVを検証しています。", "warning");

  function finalizeCsvStaging() {
    if (requestId === importReadGeneration) {
      csvFileInput.disabled = false;
    }
  }

  reader.onload = function () {
    try {
      if (requestId !== importReadGeneration) {
        return;
      }

      pendingCsvImport = validateCsvText(String(reader.result || ""));
      pendingCsvImport.fileName = file.name || "CSVファイル";
      updateCsvImportPreview();

      const acceptedCount = pendingCsvImport.validCount + pendingCsvImport.warningCount;
      const statusType = pendingCsvImport.invalidCount > 0 || pendingCsvImport.fatalError ? "warning" : "success";
      showDataManagementStatus(
        `CSVを検証しました。読み込み可能${acceptedCount}件、除外${pendingCsvImport.invalidCount}件です。内容を確認して確定してください。`,
        statusType
      );
      window.location.hash = "data/import-review";
    } catch (error) {
      pendingCsvImport = null;
      showDataManagementStatus("CSVの検証中にエラーが発生しました。ファイル内容を確認してください。", "error");
    } finally {
      finalizeCsvStaging();
    }
  };

  reader.onerror = function () {
    if (requestId === importReadGeneration) {
      pendingCsvImport = null;
      showDataManagementStatus("CSVファイルを読み込めませんでした。ファイル形式を確認してください。", "error");
    }

    finalizeCsvStaging();
  };

  try {
    reader.readAsText(file, "utf-8");
  } catch (error) {
    if (requestId === importReadGeneration) {
      pendingCsvImport = null;
      showDataManagementStatus("CSVファイルの読み込みを開始できませんでした。", "error");
    }
    finalizeCsvStaging();
  }
}

function confirmCsvImport() {
  if (!pendingCsvImport || pendingCsvImport.sales.length === 0) {
    return;
  }

  const importMode = getSelectedCsvImportMode();
  const isReplaceMode = importMode === "replace";
  const baseSales = isReplaceMode ? [] : sales;
  const safeImportedSales = ensureUniqueImportedIds(pendingCsvImport.sales, baseSales);
  const nextSales = isReplaceMode ? safeImportedSales : [...safeImportedSales, ...sales];

  if (!commitSales(nextSales, `CSVから${safeImportedSales.length}件を読み込みました。`)) {
    return;
  }

  clearPendingCsvImport();
  resetForm();
  renderDashboard();
  window.location.hash = "data/list";
}

// 選択された画像を、localStorageに保存しやすい小さなJPEG画像へ変換します
function resizeImage(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    // FileReaderで、選択した画像ファイルをBase64文字列として読み込みます
    reader.onload = function () {
      const image = new Image();

      image.onload = function () {
        const maxWidth = 300;
        const scale = Math.min(1, maxWidth / image.width);
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        // canvasに縮小した画像を描き直します
        context.drawImage(image, 0, 0, width, height);

        // JPEG形式、画質0.7でBase64文字列に変換します
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };

      image.onerror = reject;
      image.src = reader.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 選択中の月に含まれるデータだけを取り出します
function getFilteredSales() {
  const selectedMonth = monthFilterInput.value;

  return sales.filter(function (sale) {
    return sale.saleDate && sale.saleDate.slice(0, 7) === selectedMonth;
  });
}

// 一覧表示用に、検索・販路絞り込み・並び替えを適用します
function getVisibleSales(monthlySales) {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedChannel = channelFilter.value;
  const selectedSort = sortSelect.value;

  let visibleSales = monthlySales.filter(function (sale) {
    const itemName = String(sale.itemName || "").toLowerCase();
    const memo = String(sale.memo || "").toLowerCase();
    const matchesKeyword = keyword === "" || itemName.includes(keyword) || memo.includes(keyword);
    const matchesChannel = selectedChannel === "all" || sale.salesChannel === selectedChannel;

    return matchesKeyword && matchesChannel;
  });

  // 元の配列を直接並び替えないよう、コピーを作ってからsortします
  visibleSales = [...visibleSales].sort(function (firstSale, secondSale) {
    if (selectedSort === "dateAsc") {
      const dateCompare = String(firstSale.saleDate).localeCompare(String(secondSale.saleDate));
      return dateCompare || Number(firstSale.id || 0) - Number(secondSale.id || 0);
    }

    if (selectedSort === "priceDesc") {
      return Number(secondSale.salePrice || 0) - Number(firstSale.salePrice || 0);
    }

    if (selectedSort === "profitDesc") {
      return Number(secondSale.profit || 0) - Number(firstSale.profit || 0);
    }

    if (selectedSort === "profitRateDesc") {
      return Number(secondSale.profitRate || 0) - Number(firstSale.profitRate || 0);
    }

    const dateCompare = String(secondSale.saleDate).localeCompare(String(firstSale.saleDate));
    return dateCompare || Number(secondSale.id || 0) - Number(firstSale.id || 0);
  });

  return visibleSales;
}

// 「2026-06」を「2026年6月」のように表示しやすい形へ変換します
function formatMonthLabel(monthText) {
  const parts = monthText.split("-");
  return `${parts[0]}年${Number(parts[1])}月`;
}

// 「2026-06」のような月から、その月の最終日を取得します
function getLastDayOfMonth(monthText) {
  const parts = monthText.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);

  return new Date(year, month, 0).getDate();
}

// 選択中の月を、1〜7日、8〜14日、15〜21日、22日〜月末の4週に分けます
function getWeeklyRanges(monthText) {
  const lastDay = getLastDayOfMonth(monthText);
  const monthNumber = Number(monthText.split("-")[1]);
  const ranges = [
    [1, 7],
    [8, 14],
    [15, 21],
    [22, lastDay]
  ];

  return ranges.map(function (range, index) {
    return {
      weekNumber: index + 1,
      startDay: range[0],
      endDay: range[1],
      label: `第${index + 1}週 ${monthNumber}/${range[0]}〜${monthNumber}/${range[1]}`
    };
  });
}

// 「2026-06-03」を「6/3」のように短く表示します
function formatDayLabel(dateText) {
  const parts = dateText.split("-");
  return `${Number(parts[1])}/${Number(parts[2])}`;
}

// 詳細画面の日付を「2026/07/09」の形で表示します
function formatDateSlash(dateText) {
  return dateText ? dateText.replaceAll("-", "/") : "-";
}

// 選択中の月のデータを販売日ごとにまとめます。売上がある日だけを返します
function getDailySalesGroups(filteredSales) {
  const groups = {};

  filteredSales.forEach(function (sale) {
    if (!sale.saleDate) {
      return;
    }

    if (!groups[sale.saleDate]) {
      groups[sale.saleDate] = [];
    }

    groups[sale.saleDate].push(sale);
  });

  return Object.keys(groups)
    .sort(function (firstDate, secondDate) {
      return firstDate.localeCompare(secondDate);
    })
    .map(function (dateText) {
      return {
        dateText,
        sales: groups[dateText]
      };
    });
}

// 登録済みデータから、月別サマリーで選べる年度を作ります
function getAvailableSummaryYears() {
  const years = new Set();

  sales.forEach(function (sale) {
    if (sale.saleDate) {
      years.add(sale.saleDate.slice(0, 4));
    }
  });

  return [...years].sort(function (firstYear, secondYear) {
    return secondYear.localeCompare(firstYear);
  });
}

// 月別サマリーの年度セレクトを、登録データに合わせて更新します
function updateSummaryYearOptions() {
  const currentYear = String(new Date().getFullYear());
  const years = getAvailableSummaryYears();
  const previousValue = summaryYearSelect.value;
  const selectedYear = years.includes(previousValue)
    ? previousValue
    : years.includes(currentYear)
      ? currentYear
      : years[0] || currentYear;

  summaryYearSelect.innerHTML = "";

  const displayYears = years.length > 0 ? years : [currentYear];

  displayYears.forEach(function (year) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year}年`;
    summaryYearSelect.appendChild(option);
  });

  summaryYearSelect.value = selectedYear;
}

// 全データを販売日の年月ごとにまとめます
function getMonthlySummaryGroups(selectedYear) {
  const groups = {};

  sales.forEach(function (sale) {
    if (!sale.saleDate) {
      return;
    }

    if (sale.saleDate.slice(0, 4) !== selectedYear) {
      return;
    }

    const month = sale.saleDate.slice(0, 7);

    if (!groups[month]) {
      groups[month] = [];
    }

    groups[month].push(sale);
  });

  return Object.keys(groups)
    .sort(function (firstMonth, secondMonth) {
      return secondMonth.localeCompare(firstMonth);
    })
    .map(function (month) {
      return {
        month,
        sales: groups[month],
        summary: calculateSummary(groups[month])
      };
    });
}

// 集計に使う合計値や平均値を計算します
function calculateSummary(targetSales) {
  const salesTotal = targetSales.reduce(function (total, sale) {
    return total + Number(sale.salePrice || 0);
  }, 0);

  const costTotal = targetSales.reduce(function (total, sale) {
    return total + Number(sale.costPrice || 0);
  }, 0);

  const shippingTotal = targetSales.reduce(function (total, sale) {
    return total + Number(sale.shippingFee || 0);
  }, 0);

  const feeTotal = targetSales.reduce(function (total, sale) {
    return total + Number(sale.fee || 0);
  }, 0);

  const profitTotal = targetSales.reduce(function (total, sale) {
    return total + Number(sale.profit || 0);
  }, 0);

  // 平均利益率は、各商品の利益率を足して件数で割っています
  const profitRateTotal = targetSales.reduce(function (total, sale) {
    return total + Number(sale.profitRate || 0);
  }, 0);

  const averageRate = targetSales.length === 0 ? 0 : profitRateTotal / targetSales.length;

  // 販路別集計では、利益合計を売上合計で割った利益率も使います
  const totalProfitRate = salesTotal === 0 ? 0 : profitTotal / salesTotal * 100;

  return {
    salesTotal,
    costTotal,
    shippingTotal,
    feeTotal,
    profitTotal,
    averageRate,
    totalProfitRate,
    count: targetSales.length
  };
}

// 選択中の月の平均値や粗利率を計算します
function calculateKpi(targetSales) {
  const summary = calculateSummary(targetSales);
  const count = summary.count;
  const saleDaysValues = targetSales
    .map(function (sale) {
      return Number.isFinite(sale.saleDays)
        ? sale.saleDays
        : calculateSaleDays(sale.saleDate, sale.purchaseDate);
    })
    .filter(function (saleDays) {
      return Number.isFinite(saleDays);
    });
  const saleDaysTotal = saleDaysValues.reduce(function (total, saleDays) {
    return total + saleDays;
  }, 0);
  // 入金額は「売価 - 手数料 - 送料」です。商品ごとに計算して合計します
  const depositTotal = targetSales.reduce(function (total, sale) {
    const deposit = Number(sale.salePrice || 0) - Number(sale.fee || 0) - Number(sale.shippingFee || 0);
    return total + deposit;
  }, 0);

  return {
    averageSalePrice: count === 0 ? 0 : summary.salesTotal / count,
    averageCostPrice: count === 0 ? 0 : summary.costTotal / count,
    averageShippingFee: count === 0 ? 0 : summary.shippingTotal / count,
    averageFee: count === 0 ? 0 : summary.feeTotal / count,
    feeRate: summary.salesTotal === 0 ? 0 : summary.feeTotal / summary.salesTotal * 100,
    shippingRate: summary.salesTotal === 0 ? 0 : summary.shippingTotal / summary.salesTotal * 100,
    costRate: summary.salesTotal === 0 ? 0 : summary.costTotal / summary.salesTotal * 100,
    averageProfit: count === 0 ? 0 : summary.profitTotal / count,
    averageDeposit: count === 0 ? 0 : depositTotal / count,
    averageSaleDays: saleDaysValues.length === 0 ? null : saleDaysTotal / saleDaysValues.length,
    grossProfitRate: summary.salesTotal === 0 ? 0 : summary.profitTotal / summary.salesTotal * 100
  };
}

// ホームで使う販売速度は、仕入日から販売日数を計算できる商品だけを対象にします
function calculateSalesSpeed(targetSales) {
  const saleDaysValues = targetSales
    .map(function (sale) {
      return Number.isFinite(sale.saleDays)
        ? sale.saleDays
        : calculateSaleDays(sale.saleDate, sale.purchaseDate);
    })
    .filter(function (saleDays) {
      return Number.isFinite(saleDays) && saleDays >= 0;
    })
    .sort(function (firstValue, secondValue) {
      return firstValue - secondValue;
    });

  if (saleDaysValues.length === 0) {
    return {
      median: null,
      within30Rate: null,
      within90Rate: null,
      count: 0
    };
  }

  const centerIndex = Math.floor(saleDaysValues.length / 2);
  const median = saleDaysValues.length % 2 === 0
    ? (saleDaysValues[centerIndex - 1] + saleDaysValues[centerIndex]) / 2
    : saleDaysValues[centerIndex];
  const within30Count = saleDaysValues.filter(function (saleDays) {
    return saleDays <= 30;
  }).length;
  const within90Count = saleDaysValues.filter(function (saleDays) {
    return saleDays <= 90;
  }).length;

  return {
    median,
    within30Rate: within30Count / saleDaysValues.length * 100,
    within90Rate: within90Count / saleDaysValues.length * 100,
    count: saleDaysValues.length
  };
}

// 選択中の月の日ごとの売上を、1日から月末まで並べます
function getDailyTrendValues(targetSales, monthText) {
  const lastDay = getLastDayOfMonth(monthText);
  const totals = Array.from({ length: lastDay }, function () {
    return 0;
  });

  targetSales.forEach(function (sale) {
    const day = Number(String(sale.saleDate || "").slice(8, 10));

    if (day >= 1 && day <= lastDay) {
      totals[day - 1] += Number(sale.salePrice || 0);
    }
  });

  return totals;
}

// 画面名や下部ナビを、現在のハッシュルートへ合わせます
function getCurrentRoute() {
  const route = window.location.hash.replace(/^#\/?/, "");
  const supportedRoutes = [
    "home",
    "register",
    "analysis/overview",
    "analysis/weekly",
    "analysis/daily",
    "analysis/channel",
    "analysis/monthly",
    "analysis/ai",
    "data/list",
    "data/manage",
    "data/import-review"
  ];

  if (supportedRoutes.includes(route) || /^data\/sale\/.+/.test(route)) {
    return route;
  }

  return "home";
}

function getRouteGroup(route) {
  if (route.startsWith("analysis/")) {
    return "analysis";
  }

  if (route.startsWith("data/")) {
    return "data";
  }

  return route;
}

function getRouteTitle(route) {
  if (route === "home") {
    return "古着売上管理";
  }

  if (route === "register") {
    return editingSaleId === null ? "売上を登録" : "売上を編集";
  }

  const analysisTitles = {
    "analysis/overview": "分析",
    "analysis/weekly": "週間レポート",
    "analysis/daily": "日別売上",
    "analysis/channel": "販路別分析",
    "analysis/monthly": "月別サマリー",
    "analysis/ai": "AI分析用コピー"
  };

  if (analysisTitles[route]) {
    return analysisTitles[route];
  }

  if (route === "data/manage") {
    return "データ管理";
  }

  if (route === "data/import-review") {
    return "読み込み内容の確認";
  }

  if (route.startsWith("data/sale/")) {
    return "商品詳細";
  }

  return "売上データ";
}

function showRoute(options = {}) {
  const route = getCurrentRoute();
  const routeGroup = getRouteGroup(route);

  // 確認待ちデータがない直接アクセスは、管理画面へ安全に戻します
  if (route === "data/import-review" && !pendingCsvImport && !pendingJsonRestore) {
    window.location.replace("#data/manage");
    return;
  }

  appViews.forEach(function (view) {
    const directRoute = view.dataset.route;
    const groupedRoutes = String(view.dataset.routes || "").split(" ").filter(Boolean);
    const routePattern = view.dataset.routePattern;
    const matchesPattern = routePattern ? route.startsWith(routePattern) : false;
    view.hidden = directRoute !== route && !groupedRoutes.includes(route) && !matchesPattern;
  });

  routeTitle.textContent = getRouteTitle(route);
  bottomNavLinks.forEach(function (link) {
    const isActive = link.dataset.navGroup === routeGroup;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  analysisTabLinks.forEach(function (link) {
    const linkRoute = link.getAttribute("href").replace(/^#/, "");
    const isActive = linkRoute === route;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (route.startsWith("data/sale/")) {
    renderSalePlaceholderRoute(route);
  }

  if (route === "data/import-review") {
    if (pendingJsonRestore) {
      renderJsonImportReview();
    } else {
      updateCsvImportPreview();
    }
  }

  if (!options.skipScroll) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

// 週間レポート用に、合計・平均・率をまとめて計算します
function calculateWeeklyMetrics(targetSales) {
  const summary = calculateSummary(targetSales);
  const count = summary.count;
  const depositTotal = targetSales.reduce(function (total, sale) {
    const deposit = Number(sale.salePrice || 0) - Number(sale.fee || 0) - Number(sale.shippingFee || 0);
    return total + deposit;
  }, 0);

  return {
    salesTotal: summary.salesTotal,
    costTotal: summary.costTotal,
    shippingTotal: summary.shippingTotal,
    feeTotal: summary.feeTotal,
    profitTotal: summary.profitTotal,
    count,
    averageSalePrice: count === 0 ? 0 : summary.salesTotal / count,
    averageProfit: count === 0 ? 0 : summary.profitTotal / count,
    averageProfitRate: summary.salesTotal === 0 ? 0 : summary.profitTotal / summary.salesTotal * 100,
    costRate: summary.salesTotal === 0 ? 0 : summary.costTotal / summary.salesTotal * 100,
    shippingRate: summary.salesTotal === 0 ? 0 : summary.shippingTotal / summary.salesTotal * 100,
    feeRate: summary.salesTotal === 0 ? 0 : summary.feeTotal / summary.salesTotal * 100,
    averageDeposit: count === 0 ? 0 : depositTotal / count
  };
}

// 日付から曜日の番号を取得します
function getWeekdayIndex(dateText) {
  const dateValue = parseDateText(dateText);
  return dateValue ? dateValue.getDay() : null;
}

// AI分析用に、曜日ごとの売上をまとめます
function getWeekdaySalesGroups(targetSales) {
  return weekdays.map(function (weekday, index) {
    const weekdaySales = targetSales.filter(function (sale) {
      return getWeekdayIndex(sale.saleDate) === index;
    });

    return {
      label: weekday.name,
      shortLabel: weekday.shortName,
      sales: weekdaySales,
      metrics: calculateWeeklyMetrics(weekdaySales)
    };
  });
}

// AI分析用に、月初から月末までのタイミング別に売上をまとめます
function getMonthTimingGroups(targetSales, monthText) {
  return getWeeklyRanges(monthText).map(function (range) {
    const timingSales = targetSales.filter(function (sale) {
      const saleDay = Number(String(sale.saleDate || "").slice(8, 10));
      return saleDay >= range.startDay && saleDay <= range.endDay;
    });

    return {
      label: range.label,
      period: `${range.startDay}日〜${range.endDay}日`,
      sales: timingSales,
      metrics: calculateWeeklyMetrics(timingSales)
    };
  });
}

// AIに渡す集計行を、読みやすい1行にします
function formatAiMetricsLine(label, metrics) {
  return `${label}: 売上 ${formatYen(metrics.salesTotal)} / 利益 ${formatYen(metrics.profitTotal)} / 件数 ${metrics.count}件 / 平均売価 ${formatYen(metrics.averageSalePrice)} / 平均利益率 ${formatPercent(metrics.averageProfitRate)}`;
}

// 月ごとの季節・給料日・ボーナスなど、AIに読ませたい参照文脈を作ります
function getAiContextNotes(monthText) {
  const monthNumber = Number(monthText.split("-")[1]);
  const baseNotes = [
    "月初、月中、月末で購買行動が変わる可能性があります。",
    "25日前後は給料日後の購買増加が起きる可能性があります。",
    "曜日別では金曜日、土曜日、日曜日の購買傾向に注目してください。"
  ];
  const monthNotes = {
    1: [
      "1月は正月後、初売り後、冬物需要、年始の財布の引き締めが混在しやすい時期です。"
    ],
    2: [
      "2月は冬物終盤で、春物への切り替え前の在庫整理や値下げ反応が出やすい時期です。"
    ],
    3: [
      "3月は春物、卒業・新生活、引っ越し前後の購買が影響しやすい時期です。"
    ],
    4: [
      "4月は新生活と春物需要が続き、ライトアウターやシャツ類の動きに注目したい時期です。"
    ],
    5: [
      "5月は連休、初夏需要、半袖や薄手商品の反応が出始める時期です。"
    ],
    6: [
      "6月は夏前の時期で、半袖、薄手、リネン、Tシャツ、ショーツなど季節商品の影響が出やすい可能性があります。",
      "6月後半から7月にかけて夏のボーナス時期が近づくため、高単価商品の動きに影響がある可能性があります。"
    ],
    7: [
      "7月は夏物本番と夏のボーナス時期が重なり、高単価商品や即戦力の夏物に注目したい時期です。"
    ],
    8: [
      "8月は夏物終盤で、暑さによる需要と秋物への切り替え前の動きが混在しやすい時期です。"
    ],
    9: [
      "9月は秋物への切り替え時期で、長袖、ライトアウター、色味の変化に注目したい時期です。"
    ],
    10: [
      "10月は秋物本番で、アウター手前の商品や重ね着向き商品の反応が出やすい時期です。"
    ],
    11: [
      "11月は冬物需要が強まり、アウター、ニット、スウェットなど単価が上がりやすい時期です。"
    ],
    12: [
      "12月は冬物本番、年末需要、冬のボーナス時期が重なり、高単価商品やギフト的な購買にも注目したい時期です。"
    ]
  };

  return [...baseNotes, ...(monthNotes[monthNumber] || [])];
}

// AI分析用の商品明細を作ります
function buildAiItemDetailLines(targetSales, includeMemos) {
  const sortedSales = [...targetSales].sort(function (firstSale, secondSale) {
    const dateCompare = String(firstSale.saleDate).localeCompare(String(secondSale.saleDate));
    return dateCompare || Number(firstSale.id || 0) - Number(secondSale.id || 0);
  });

  if (sortedSales.length === 0) {
    return ["商品明細: なし"];
  }

  return sortedSales.map(function (sale, index) {
    const saleDays = Number.isFinite(sale.saleDays)
      ? sale.saleDays
      : calculateSaleDays(sale.saleDate, sale.purchaseDate);
    const weekdayIndex = getWeekdayIndex(sale.saleDate);
    const weekdayLabel = weekdayIndex === null ? "-" : weekdays[weekdayIndex].shortName;
    const memoText = includeMemos && sale.memo ? ` / メモ: ${sale.memo.replace(/\s+/g, " ")}` : "";

    return `${index + 1}. ${sale.saleDate}(${weekdayLabel}) / ${sale.salesChannel} / ${sale.itemName} / 売値 ${formatYen(sale.salePrice)} / 原価 ${formatYen(sale.costPrice)} / 送料 ${formatYen(sale.shippingFee)} / 手数料 ${formatYen(sale.fee)} / 利益 ${formatYen(sale.profit)} / 利益率 ${formatPercent(Number(sale.profitRate || 0))} / 販売日数 ${formatSaleDays(saleDays)}${memoText}`;
  });
}

// 表示中の月の売上データから、AIへ貼り付ける分析依頼文を作ります
function buildAiAnalysisText(targetSales) {
  const selectedMonth = monthFilterInput.value;
  const summary = calculateSummary(targetSales);
  const kpi = calculateKpi(targetSales);
  const weekdayGroups = getWeekdaySalesGroups(targetSales);
  const timingGroups = getMonthTimingGroups(targetSales, selectedMonth);
  const contextNotes = getAiContextNotes(selectedMonth);
  const includeDetails = includeAiItemDetails.checked;
  const includeMemos = includeAiMemos.checked;
  const channelLines = salesChannels.map(function (channelName) {
    const channelSales = targetSales.filter(function (sale) {
      return sale.salesChannel === channelName;
    });
    return formatAiMetricsLine(channelName, calculateWeeklyMetrics(channelSales));
  });
  const itemDetailLines = includeDetails
    ? buildAiItemDetailLines(targetSales, includeMemos)
    : ["商品明細: 省略"];

  return [
    "あなたは古着販売の売上分析担当です。",
    "以下の売上データをもとに、販売傾向・利益改善・出品戦略を分析してください。",
    "",
    "特に見てほしいこと:",
    "1. 曜日ごとの売れやすさ、特に金曜日の傾向",
    "2. 月初・中旬・月末の違い",
    "3. 給料日やボーナス時期に近い影響",
    "4. 季節要因と商品ジャンルの相性",
    "5. 販路ごとの強みと弱み",
    "6. 利益率が高い商品の特徴",
    "7. 利益を下げている要因",
    "8. 次月に取るべき具体的な出品・値付け・仕入れの行動",
    "",
    `対象期間: ${formatMonthLabel(selectedMonth)}`,
    "",
    "参照条件:",
    ...contextNotes.map(function (note) {
      return `- ${note}`;
    }),
    "",
    "全体集計:",
    `- 売上合計: ${formatYen(summary.salesTotal)}`,
    `- 原価合計: ${formatYen(summary.costTotal)}`,
    `- 送料合計: ${formatYen(summary.shippingTotal)}`,
    `- 手数料合計: ${formatYen(summary.feeTotal)}`,
    `- 利益合計: ${formatYen(summary.profitTotal)}`,
    `- 平均利益率: ${formatPercent(summary.averageRate)}`,
    `- 粗利率: ${formatPercent(kpi.grossProfitRate)}`,
    `- 登録件数: ${summary.count}件`,
    `- 平均売価: ${formatYen(kpi.averageSalePrice)}`,
    `- 平均原価: ${formatYen(kpi.averageCostPrice)}`,
    `- 平均送料: ${formatYen(kpi.averageShippingFee)}`,
    `- 平均利益: ${formatYen(kpi.averageProfit)}`,
    `- 平均販売日数: ${formatAverageSaleDays(kpi.averageSaleDays)}`,
    "",
    "曜日別集計:",
    ...weekdayGroups.map(function (group) {
      return `- ${formatAiMetricsLine(group.label, group.metrics)}`;
    }),
    "",
    "月内タイミング別集計:",
    ...timingGroups.map(function (group) {
      return `- ${formatAiMetricsLine(`${group.label} (${group.period})`, group.metrics)}`;
    }),
    "",
    "販路別集計:",
    ...channelLines.map(function (line) {
      return `- ${line}`;
    }),
    "",
    "商品明細:",
    ...itemDetailLines,
    "",
    "出力してほしい形式:",
    "1. 重要な発見を5つ",
    "2. 売れている要因の仮説",
    "3. 利益を下げている要因",
    "4. 曜日・月内タイミング・季節要因の解釈",
    "5. 次月に実行する具体策を優先順位つきで"
  ].join("\n");
}

// AI分析用プレビューを、現在の表示月に合わせて更新します
function renderAiAnalysisPreview() {
  const filteredSales = getFilteredSales();
  const summary = calculateSummary(filteredSales);

  // 対象月や出力条件が変わったら、以前のコピー完了表示はいったん消します
  aiCopyStatus.textContent = "";
  aiCopyStatus.style.display = "none";
  aiCopyStatus.classList.remove("is-error");

  // AIへ渡す文章と同じ対象月の数字を、画面上でも先に確認できるようにします
  aiSummarySales.textContent = formatYen(summary.salesTotal);
  aiSummaryProfit.textContent = formatYen(summary.profitTotal);
  aiSummaryCount.textContent = `${summary.count}件`;

  if (filteredSales.length === 0) {
    aiAnalysisPreview.value = `${formatMonthLabel(monthFilterInput.value)}の売上データがありません。`;
    return;
  }

  aiAnalysisPreview.value = buildAiAnalysisText(filteredSales);
}

function showAiCopyStatus(message, isError = false) {
  aiCopyStatus.textContent = message;
  aiCopyStatus.classList.toggle("is-error", isError);
  aiCopyStatus.style.display = "block";
}

// クリップボードAPIが使えない環境では、選択コピーにフォールバックします
async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  aiAnalysisPreview.focus();
  aiAnalysisPreview.select();

  if (!document.execCommand("copy")) {
    throw new Error("copy failed");
  }
}

async function copyAiAnalysisText() {
  const filteredSales = getFilteredSales();

  if (filteredSales.length === 0) {
    renderAiAnalysisPreview();
    showAiCopyStatus("表示中の月にコピーできる売上データがありません。", true);
    return;
  }

  const text = buildAiAnalysisText(filteredSales);
  aiAnalysisPreview.value = text;

  try {
    await copyTextToClipboard(text);
    showAiCopyStatus("AI分析用テキストをコピーしました。");
  } catch (error) {
    showAiCopyStatus("自動コピーできませんでした。プレビュー欄を選択してコピーしてください。", true);
  }
}

// localStorageから登録済みデータを安全に読み込みます
function loadSales() {
  if (!canUseStorage) {
    exportJsonBackupButton.disabled = true;
    showDataManagementStatus("このブラウザでは端末内保存を利用できません。", "warning");
    return;
  }

  let savedSales = null;

  try {
    savedSales = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    storageLoadBlocked = true;
    exportJsonBackupButton.disabled = true;
    showDataManagementStatus("端末内の保存領域を読み込めませんでした。ブラウザの設定を確認してください。", "error");
    return;
  }

  if (!savedSales) {
    sales = [];
    storageLoadBlocked = false;
    exportJsonBackupButton.disabled = false;
    showDataManagementStatus("保存データは0件です。JSON完全バックアップを定期的に保存してください。");
    return;
  }

  const parsed = safeParseJson(savedSales, null);

  if (!parsed.ok || !Array.isArray(parsed.value)) {
    sales = [];
    storageLoadBlocked = true;
    exportJsonBackupButton.disabled = true;
    showDataManagementStatus(
      "端末内の売上データが壊れているため読み込めませんでした。元データは上書きしていません。JSONバックアップを復元してください。",
      "error"
    );
    return;
  }

  const normalizedSales = parsed.value.map(function (sale, index) {
    return normalizeSaleRecord(sale, Date.now() + index);
  });
  const duplicateIdCount = countDuplicateSaleIds(normalizedSales);
  sales = ensureUniqueImportedIds(normalizedSales, []);
  storageLoadBlocked = false;
  exportJsonBackupButton.disabled = false;

  if (duplicateIdCount > 0) {
    if (saveSales(sales)) {
      showDataManagementStatus(
        `${sales.length}件を読み込み、詳細URLが重なるID ${duplicateIdCount}件を安全なIDへ修正しました。`,
        "warning"
      );
    }
    return;
  }

  showDataManagementStatus(`${sales.length}件の保存データを安全に読み込みました。`);
}

// 保存容量超過などを捕捉し、成功した場合だけ呼び出し側が配列を更新できるようにします
function saveSales(nextSales = sales, options = {}) {
  if (!canUseStorage) {
    return true;
  }

  if (storageLoadBlocked) {
    showDataManagementStatus(
      "壊れた保存データを保護しているため上書きできません。JSONバックアップを復元してから操作してください。",
      "error"
    );
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSales));
    return true;
  } catch (error) {
    if (!options.silent) {
      showDataManagementStatus(
        "保存できませんでした。商品画像によりブラウザの保存容量を超えた可能性があります。データは変更していません。",
        "error"
      );
    }
    return false;
  }
}

// 配列とlocalStorageを同時に確定し、保存失敗時は現在の画面データを維持します
function commitSales(nextSales, successMessage) {
  if (!saveSales(nextSales)) {
    return false;
  }

  sales = nextSales;

  if (successMessage) {
    showDataManagementStatus(successMessage);
  }

  return true;
}

function downloadTextFile(text, fileName, mimeType) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// 商品画像と設定を含む、アプリ全体の完全バックアップを作ります
function buildJsonBackup() {
  return {
    backupVersion: BACKUP_VERSION,
    createdAt: new Date().toISOString(),
    appMeta: loadAppMeta(),
    sales,
    collapsedSections
  };
}

function downloadJsonBackup() {
  if (storageLoadBlocked) {
    showDataManagementStatus(
      "破損した保存データを空のバックアップで上書きしないため、完全バックアップを停止しています。正常なJSONバックアップを復元してください。",
      "error"
    );
    return;
  }

  const backup = buildJsonBackup();
  downloadTextFile(
    JSON.stringify(backup, null, 2),
    `used-clothes-backup-${getTodayText()}.json`,
    "application/json;charset=utf-8"
  );
  showDataManagementStatus(`画像を含む${sales.length}件の完全バックアップを保存しました。`);
}

function validateBackupSale(sale, index) {
  const reasons = [];
  const rowLabel = `${index + 1}件目`;
  const salePrice = parseOptionalNumber(sale.salePrice);
  const costPrice = parseOptionalNumber(sale.costPrice);
  const shippingFee = parseOptionalNumber(sale.shippingFee);
  const feeRate = parseOptionalNumber(sale.feeRate);

  if (!isStrictDateText(sale.saleDate)) {
    reasons.push("販売日が正しい日付ではありません");
  }

  if (sale.purchaseDate && !isStrictDateText(sale.purchaseDate)) {
    reasons.push("仕入日が正しい日付ではありません");
  } else if (sale.purchaseDate && sale.saleDate && calculateSaleDays(sale.saleDate, sale.purchaseDate) < 0) {
    reasons.push("仕入日が販売日より後です");
  }

  if (!salesChannels.includes(sale.salesChannel)) {
    reasons.push("販路が登録済みの選択肢ではありません");
  }

  if (typeof sale.itemName !== "string" || !sale.itemName.trim()) {
    reasons.push("商品名が空欄です");
  }

  if (salePrice === null || salePrice < 1) {
    reasons.push("売値は1円以上である必要があります");
  }

  if (costPrice === null || costPrice < 0) {
    reasons.push("仕入れ値は0円以上である必要があります");
  }

  if (shippingFee === null || shippingFee < 0) {
    reasons.push("送料は0円以上である必要があります");
  }

  if (feeRate === null || feeRate < 0 || feeRate > 100) {
    reasons.push("販売手数料率は0〜100である必要があります");
  }

  return reasons.length > 0 ? `${rowLabel}: ${reasons.join("、")}` : "";
}

function validateJsonBackup(backup) {
  const errors = [];
  const invalidSaleReasons = [];

  if (!backup || typeof backup !== "object") {
    errors.push("JSONの内容がバックアップ形式ではありません。");
  } else {
    if (backup.backupVersion !== BACKUP_VERSION) {
      errors.push("対応していないバックアップのバージョンです。");
    }

    if (!Array.isArray(backup.sales)) {
      errors.push("売上データが配列ではありません。");
    } else if (backup.sales.some(function (sale) {
      return !sale || typeof sale !== "object" || Array.isArray(sale);
    })) {
      errors.push("売上データに不正な形式の項目があります。");
    } else {
      const duplicateIds = new Set();
      const seenIds = new Set();

      backup.sales.forEach(function (sale, index) {
        const reason = validateBackupSale(sale, index);
        const idKey = getSaleIdKey(sale.id);

        if (reason) {
          invalidSaleReasons.push(reason);
        }

        if (idKey && seenIds.has(idKey)) {
          duplicateIds.add(idKey);
        } else if (idKey) {
          seenIds.add(idKey);
        }
      });

      if (invalidSaleReasons.length > 0) {
        errors.push(
          `売上データ${invalidSaleReasons.length}件が不正です。先頭の理由: ${invalidSaleReasons[0]}`
        );
      }

      if (duplicateIds.size > 0) {
        errors.push(`売上データに重複IDが${duplicateIds.size}件あります。`);
      }
    }

    if (!backup.appMeta || typeof backup.appMeta !== "object") {
      errors.push("アプリ情報がありません。");
    }

    if (!backup.collapsedSections || typeof backup.collapsedSections !== "object" || Array.isArray(backup.collapsedSections)) {
      errors.push("折りたたみ設定の形式が正しくありません。");
    }
  }

  return {
    errors,
    invalidSaleCount: invalidSaleReasons.length,
    firstInvalidSaleReason: invalidSaleReasons[0] || ""
  };
}

function restoreStorageValue(storageKey, previousValue) {
  if (previousValue === null) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.setItem(storageKey, previousValue);
  }
}

function finalizeJsonRestoreControls() {
  exportJsonBackupButton.disabled = storageLoadBlocked;
  jsonBackupInput.disabled = false;
  jsonBackupInput.value = "";
}

function formatBackupDate(dateText) {
  const date = new Date(dateText);
  return Number.isNaN(date.getTime()) ? "日時不明" : date.toLocaleString("ja-JP");
}

// 検証済みJSONの概要を、保存へ反映する前の確認画面に表示します
function renderJsonImportReview() {
  if (!pendingJsonRestore) {
    return;
  }

  const imageCount = pendingJsonRestore.normalizedSales.filter(function (sale) {
    return Boolean(sale.imageData);
  }).length;
  importReviewFileName.textContent = pendingJsonRestore.fileName || "JSONバックアップ";
  importReviewMode.textContent = "完全復元";
  csvImportPreview.hidden = true;
  csvReviewPanel.hidden = true;
  jsonReviewPanel.hidden = false;
  jsonReviewCreatedAt.textContent = formatBackupDate(pendingJsonRestore.backup.createdAt);
  jsonReviewCount.textContent = `${pendingJsonRestore.normalizedSales.length}件`;
  jsonReviewImageCount.textContent = `${imageCount}件`;
  confirmCsvImportButton.disabled = false;
  confirmCsvImportButton.textContent = "確認してJSONを復元する";
}

// JSONファイルは選択時に検証し、確認画面で確定するまで保存しません
function restoreJsonBackup(file) {
  if (!canUseStorage) {
    showDataManagementStatus("このブラウザではJSONバックアップを復元できません。", "error");
    jsonBackupInput.value = "";
    return;
  }

  const reader = new FileReader();
  const requestId = importReadGeneration + 1;
  importReadGeneration = requestId;
  pendingCsvImport = null;
  pendingJsonRestore = null;
  csvFileInput.disabled = false;
  csvFileInput.value = "";
  exportJsonBackupButton.disabled = true;
  jsonBackupInput.disabled = true;
  showDataManagementStatus("JSONバックアップを検証しています。", "warning");

  reader.onload = function () {
    try {
      if (requestId !== importReadGeneration) {
        return;
      }

      const parsed = safeParseJson(String(reader.result || ""), null);
      const validation = parsed.ok
        ? validateJsonBackup(parsed.value)
        : { errors: ["JSONファイルを解析できません。"] };

      if (validation.errors.length > 0) {
        showDataManagementStatus(`復元できませんでした。${validation.errors.join(" ")}`, "error");
        return;
      }

      const backup = parsed.value;
      const normalizedSales = ensureUniqueImportedIds(backup.sales.map(function (sale, index) {
        return normalizeSaleRecord(sale, Date.now() + index);
      }), []);
      pendingJsonRestore = {
        backup,
        normalizedSales,
        fileName: file.name || "JSONバックアップ"
      };
      renderJsonImportReview();
      showDataManagementStatus(`${normalizedSales.length}件のJSONバックアップを検証しました。内容を確認してください。`);
      window.location.hash = "data/import-review";
    } finally {
      if (requestId === importReadGeneration) {
        finalizeJsonRestoreControls();
      }
    }
  };

  reader.onerror = function () {
    if (requestId === importReadGeneration) {
      showDataManagementStatus("JSONバックアップを読み込めませんでした。", "error");
      finalizeJsonRestoreControls();
    }
  };

  try {
    reader.readAsText(file, "utf-8");
  } catch (error) {
    if (requestId === importReadGeneration) {
      showDataManagementStatus("JSONバックアップの読み込みを開始できませんでした。", "error");
      finalizeJsonRestoreControls();
    }
  }
}

// 復元処理は3つの保存先すべてに成功した場合だけ画面へ反映します
function confirmJsonRestore() {
  if (!pendingJsonRestore || !canUseStorage) {
    return;
  }

  const { backup, normalizedSales } = pendingJsonRestore;
  let previousValues;

  try {
    // 読み取り自体が禁止されている環境でも、現在データを推測で上書きしません
    previousValues = {
      sales: localStorage.getItem(STORAGE_KEY),
      meta: localStorage.getItem(APP_META_STORAGE_KEY),
      collapsed: localStorage.getItem(COLLAPSE_STORAGE_KEY)
    };
  } catch (error) {
    showDataManagementStatus("端末内の現在データを確認できないため復元を中止しました。", "error");
    return;
  }

  const restoredMeta = {
    ...backup.appMeta,
    schemaVersion: APP_SCHEMA_VERSION,
    migratedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSales));
    localStorage.setItem(APP_META_STORAGE_KEY, JSON.stringify(restoredMeta));
    localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(backup.collapsedSections));
  } catch (error) {
    try {
      restoreStorageValue(STORAGE_KEY, previousValues.sales);
      restoreStorageValue(APP_META_STORAGE_KEY, previousValues.meta);
      restoreStorageValue(COLLAPSE_STORAGE_KEY, previousValues.collapsed);
    } catch (rollbackError) {
      console.error("バックアップ復元のロールバックに失敗しました。", rollbackError);
    }

    showDataManagementStatus("保存容量不足などにより復元できませんでした。復元前のデータを維持しています。", "error");
    return;
  }

  sales = normalizedSales;
  collapsedSections = { ...backup.collapsedSections };
  storageLoadBlocked = false;
  pendingJsonRestore = null;
  applyCollapsedSectionViews();
  resetForm();
  renderDashboard();
  finalizeJsonRestoreControls();
  showDataManagementStatus(`${sales.length}件の売上データと設定を復元しました。`);
  window.location.hash = "data/list";
}

// localStorageからセクションの折りたたみ状態を読み込みます
function loadCollapsedSections() {
  if (!canUseStorage) {
    collapsedSections = {};
    return;
  }

  let savedState = null;

  try {
    savedState = localStorage.getItem(COLLAPSE_STORAGE_KEY);
  } catch (error) {
    collapsedSections = {};
    return;
  }

  if (!savedState) {
    collapsedSections = {};
    return;
  }

  const parsed = safeParseJson(savedState, {});

  if (!parsed.ok || !parsed.value || typeof parsed.value !== "object" || Array.isArray(parsed.value)) {
    collapsedSections = {};
    return;
  }

  collapsedSections = parsed.value;
}

// セクションの折りたたみ状態をlocalStorageに保存します
function saveCollapsedSections() {
  if (!canUseStorage) {
    return;
  }

  try {
    localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(collapsedSections));
  } catch (error) {
    showDataManagementStatus("折りたたみ設定を保存できませんでした。売上データには影響ありません。", "warning");
  }
}

// 1つのセクションを開く・閉じる表示に更新します
function updateSectionCollapseView(section, isCollapsed) {
  const content = section.querySelector(".section-content");
  const toggleButton = section.querySelector(".section-toggle");

  if (!content || !toggleButton) {
    return;
  }

  content.hidden = isCollapsed;
  section.classList.toggle("is-collapsed", isCollapsed);
  toggleButton.textContent = isCollapsed ? "＋ 開く" : "− しまう";
  toggleButton.setAttribute("aria-expanded", String(!isCollapsed));
}

// 指定したセクションidを開く・閉じる共通関数です
function setSectionCollapsed(sectionId, isCollapsed) {
  const section = document.querySelector(`[data-section-id="${sectionId}"]`);

  if (!section) {
    return;
  }

  collapsedSections[sectionId] = isCollapsed;
  updateSectionCollapseView(section, isCollapsed);
  saveCollapsedSections();
}

// イベントを重複登録せず、現在の設定だけを各セクションへ反映します
function applyCollapsedSectionViews() {
  document.querySelectorAll("[data-section-id]").forEach(function (section) {
    const sectionId = section.dataset.sectionId;
    updateSectionCollapseView(section, Boolean(collapsedSections[sectionId]));
  });
}

// data-section-idが付いた各セクションに、折りたたみボタンの処理を付けます
function setupSectionToggles() {
  loadCollapsedSections();

  document.querySelectorAll("[data-section-id]").forEach(function (section) {
    const sectionId = section.dataset.sectionId;
    const toggleButton = section.querySelector(".section-toggle");
    const isCollapsed = Boolean(collapsedSections[sectionId]);

    updateSectionCollapseView(section, isCollapsed);

    if (!toggleButton) {
      return;
    }

    toggleButton.addEventListener("click", function () {
      const nextCollapsedState = !Boolean(collapsedSections[sectionId]);
      setSectionCollapsed(sectionId, nextCollapsedState);
    });
  });
}

// 画像プレビューと一時画像データを初期状態に戻します
function resetImageInput() {
  resizedImageData = "";
  imageResizePromise = Promise.resolve("");
  imageSelectionId += 1;
  imageDeleteRequested = false;
  imagePreviewWrap.style.display = "none";
  imagePreview.removeAttribute("src");
  itemImageInput.value = "";
  removeImageButton.style.display = "none";
  removeImageButton.disabled = true;
}

// フォームを新規登録モードに戻します
function resetForm() {
  form.reset();
  clearFormErrors();
  saleDateInput.value = getTodayText();
  purchaseDateInput.value = "";
  document.getElementById("feeRate").value = "10";
  editingSaleId = null;
  formTitle.textContent = "売上を登録";
  submitButton.textContent = "登録する";
  editStatus.style.display = "none";
  cancelEditButton.style.display = "none";
  resetImageInput();

  if (getCurrentRoute() === "register") {
    routeTitle.textContent = "売上を登録";
  }
}

// 編集ボタンが押された商品データをフォームへ戻します
function startEditSale(id) {
  const sale = sales.find(function (targetSale) {
    return saleIdsMatch(targetSale.id, id);
  });

  if (!sale) {
    return;
  }

  clearFormErrors();
  editingSaleId = id;
  imageDeleteRequested = false;
  imageSelectionId += 1;
  document.getElementById("saleDate").value = sale.saleDate;
  document.getElementById("purchaseDate").value = sale.purchaseDate || "";
  document.getElementById("salesChannel").value = sale.salesChannel;
  document.getElementById("itemName").value = sale.itemName;
  document.getElementById("salePrice").value = sale.salePrice;
  document.getElementById("costPrice").value = sale.costPrice;
  document.getElementById("shippingFee").value = sale.shippingFee;
  document.getElementById("feeRate").value = sale.feeRate ?? "10";
  document.getElementById("memo").value = sale.memo || "";

  // 既存画像がある場合は、画像データを保持してプレビューも表示します
  resizedImageData = sale.imageData || "";
  imageResizePromise = Promise.resolve(resizedImageData);
  itemImageInput.value = "";

  if (resizedImageData) {
    imagePreview.src = resizedImageData;
    imagePreviewWrap.style.display = "block";
    removeImageButton.style.display = "block";
    removeImageButton.disabled = false;
  } else {
    imagePreviewWrap.style.display = "none";
    imagePreview.removeAttribute("src");
    removeImageButton.style.display = "none";
    removeImageButton.disabled = true;
  }

  formTitle.textContent = "売上を編集";
  submitButton.textContent = "更新する";
  editStatus.style.display = "block";
  cancelEditButton.style.display = "block";
  // フォームを復元してから登録画面へ移動し、編集中の画像や値を保ちます
  window.location.hash = "register";
  showRoute({ skipScroll: true });
  requestAnimationFrame(function () {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// 一覧画面用の、詳細画面へ移動できるコンパクトな商品行を作ります
function createSaleCard(sale) {
  const card = document.createElement("article");
  card.className = "sales-list-item";

  const link = document.createElement("a");
  link.className = "sales-list-link";
  link.href = `#data/sale/${encodeURIComponent(String(sale.id))}`;
  link.setAttribute("aria-label", `${sale.itemName}の詳細を見る`);

  // 画像ありならサムネイル、画像なしなら分かりやすい枠を表示します
  if (sale.imageData) {
    const image = document.createElement("img");
    image.className = "sales-list-image";
    image.src = sale.imageData;
    image.alt = `${sale.itemName}の商品画像`;
    link.appendChild(image);
  } else {
    const noImage = document.createElement("div");
    noImage.className = "sale-no-image";
    noImage.textContent = "画像なし";
    link.appendChild(noImage);
  }

  const mainInfo = document.createElement("div");
  mainInfo.className = "sales-list-main";

  const meta = document.createElement("div");
  meta.className = "sales-list-meta";

  const date = document.createElement("span");
  date.textContent = sale.saleDate || "-";

  const channel = document.createElement("span");
  channel.className = "sales-list-channel";
  channel.textContent = sale.salesChannel;

  meta.append(date, channel);

  const title = document.createElement("h3");
  title.className = "sales-list-name";
  title.textContent = sale.itemName;

  const compactNumbers = document.createElement("div");
  compactNumbers.className = "sales-list-values";

  const compactNumberItems = [
    ["売値", formatYen(sale.salePrice)],
    ["利益", formatYen(sale.profit), sale.profit >= 0 ? "profit-plus" : "profit-minus"],
    ["利益率", formatPercent(sale.profitRate), sale.profit >= 0 ? "profit-plus" : "profit-minus"]
  ];

  compactNumberItems.forEach(function (item) {
    const box = document.createElement("div");
    box.className = "sales-list-value";

    const label = document.createElement("span");
    label.textContent = item[0];

    const value = document.createElement("strong");
    value.textContent = item[1];

    if (item[2]) {
      value.className = item[2];
    }

    box.append(label, value);
    compactNumbers.appendChild(box);
  });

  mainInfo.append(meta, title, compactNumbers);
  link.appendChild(mainInfo);

  const arrow = document.createElement("span");
  arrow.className = "sales-list-arrow";
  arrow.textContent = "›";
  arrow.setAttribute("aria-hidden", "true");
  link.appendChild(arrow);
  card.appendChild(link);

  return card;
}

// URLに含まれる商品idを、安全に文字列へ戻します
function getSaleIdFromRoute(route) {
  try {
    return decodeURIComponent(route.slice("data/sale/".length));
  } catch (error) {
    return "";
  }
}

// URLの商品idを文字列として照合し、実データの詳細を表示します
function renderSalePlaceholderRoute(route) {
  const saleIdText = getSaleIdFromRoute(route);
  const sale = sales.find(function (targetSale) {
    return saleIdsMatch(targetSale.id, saleIdText);
  });

  placeholderSaleImage.innerHTML = "";
  placeholderSaleId = sale ? sale.id : null;
  saleDetailMissing.hidden = Boolean(sale);
  saleDetailContent.hidden = !sale;

  if (!sale) {
    placeholderEditButton.disabled = true;
    placeholderDeleteButton.disabled = true;
    return;
  }

  if (sale.imageData) {
    const image = document.createElement("img");
    image.src = sale.imageData;
    image.alt = `${sale.itemName}の商品画像`;
    placeholderSaleImage.appendChild(image);
  } else {
    placeholderSaleImage.textContent = "画像なし";
  }

  const saleDays = Number.isFinite(sale.saleDays)
    ? sale.saleDays
    : calculateSaleDays(sale.saleDate, sale.purchaseDate);
  placeholderSaleMeta.textContent = `${formatDateSlash(sale.saleDate)} / ${sale.salesChannel || "-"}`;
  placeholderSaleName.textContent = sale.itemName || "商品名なし";
  placeholderSalePrice.textContent = formatYen(sale.salePrice);
  placeholderSaleProfit.textContent = formatYen(sale.profit);
  placeholderSaleProfitRate.textContent = formatPercent(Number(sale.profitRate || 0));
  detailSaleDate.textContent = formatDateSlash(sale.saleDate);
  detailPurchaseDate.textContent = formatDateSlash(sale.purchaseDate);
  detailSaleDays.textContent = formatSaleDays(saleDays);
  detailSalesChannel.textContent = sale.salesChannel || "-";
  detailCostPrice.textContent = formatYen(sale.costPrice);
  detailShippingFee.textContent = formatYen(sale.shippingFee);
  detailFee.textContent = formatYen(sale.fee);
  detailFeeRate.textContent = formatPercent(Number(sale.feeRate || 0));
  detailMemo.textContent = sale.memo || "メモなし";
  placeholderEditButton.disabled = false;
  placeholderDeleteButton.disabled = false;
}

// ホーム画面へ、主要実績・販売速度・最近の売上・日次推移をまとめて表示します
function renderHome(filteredSales) {
  const summary = calculateSummary(filteredSales);
  const speed = calculateSalesSpeed(filteredSales);
  const selectedMonth = monthFilterInput.value;

  homeSales.textContent = formatYen(summary.salesTotal);
  homeProfit.textContent = formatYen(summary.profitTotal);
  // ホームの利益率は、利益合計÷売上合計の加重利益率です
  homeProfitRate.textContent = formatPercent(summary.totalProfitRate);
  homeMedianSaleDays.textContent = speed.median === null
    ? "-"
    : `${Number.isInteger(speed.median) ? speed.median : speed.median.toFixed(1)}日`;
  homeWithin30Rate.textContent = speed.within30Rate === null ? "-" : formatPercent(speed.within30Rate);
  homeWithin90Rate.textContent = speed.within90Rate === null ? "-" : formatPercent(speed.within90Rate);

  homeRecentSales.innerHTML = "";
  const recentSales = [...filteredSales]
    .sort(function (firstSale, secondSale) {
      const dateCompare = String(secondSale.saleDate || "").localeCompare(String(firstSale.saleDate || ""));
      return dateCompare || Number(secondSale.id || 0) - Number(firstSale.id || 0);
    })
    .slice(0, 4);

  if (recentSales.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-inline";
    empty.textContent = "この月の売上はまだありません。";
    homeRecentSales.appendChild(empty);
  } else {
    recentSales.forEach(function (sale) {
      const item = document.createElement("article");
      item.className = "recent-sale-item";

      const date = document.createElement("time");
      date.dateTime = sale.saleDate || "";
      date.textContent = formatDayLabel(sale.saleDate);

      const name = document.createElement("strong");
      name.textContent = sale.itemName;

      const price = document.createElement("b");
      price.textContent = formatYen(sale.salePrice);

      item.append(date, name, price);
      homeRecentSales.appendChild(item);
    });
  }

  const dailyValues = getDailyTrendValues(filteredSales, selectedMonth);
  const maxValue = Math.max(...dailyValues, 1);
  homeTrendPeriod.textContent = `${formatMonthLabel(selectedMonth)}の日次売上`;
  homeTrendTotal.textContent = formatYen(summary.salesTotal);
  homeSalesChart.innerHTML = "";
  homeSalesChart.setAttribute(
    "aria-label",
    `${formatMonthLabel(selectedMonth)}の日ごとの売上。合計${formatYen(summary.salesTotal)}`
  );

  dailyValues.forEach(function (value, index) {
    const day = index + 1;
    const column = document.createElement("div");
    column.className = "chart-column";
    column.title = `${day}日 ${formatYen(value)}`;

    const barWrap = document.createElement("div");
    barWrap.className = "chart-bar-wrap";

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = `${Math.max(value / maxValue * 100, value > 0 ? 3 : 1)}%`;
    barWrap.appendChild(bar);

    const label = document.createElement("span");
    label.textContent = `${day}`;

    column.append(barWrap, label);
    homeSalesChart.appendChild(column);
  });
}

// 全体集計を画面に表示します
function renderTotalSummary(filteredSales) {
  const summary = calculateSummary(filteredSales);

  totalSales.textContent = formatYen(summary.salesTotal);
  totalCost.textContent = formatYen(summary.costTotal);
  totalShipping.textContent = formatYen(summary.shippingTotal);
  totalFee.textContent = formatYen(summary.feeTotal);
  totalProfit.textContent = formatYen(summary.profitTotal);
  averageProfitRate.textContent = formatPercent(summary.averageRate);
  summaryCount.textContent = `${summary.count}件`;
}

// 選択中の月のKPIを画面に表示します
function renderKpiSummary(filteredSales) {
  const kpi = calculateKpi(filteredSales);

  averageSalePrice.textContent = formatYen(kpi.averageSalePrice);
  averageCostPrice.textContent = formatYen(kpi.averageCostPrice);
  averageShippingFee.textContent = formatYen(kpi.averageShippingFee);
  averageFee.textContent = formatYen(kpi.averageFee);
  kpiFeeRate.textContent = formatPercent(kpi.feeRate);
  kpiShippingRate.textContent = formatPercent(kpi.shippingRate);
  kpiCostRate.textContent = formatPercent(kpi.costRate);
  averageProfit.textContent = formatYen(kpi.averageProfit);
  averageDeposit.textContent = formatYen(kpi.averageDeposit);
  averageSaleDays.textContent = formatAverageSaleDays(kpi.averageSaleDays);
  grossProfitRate.textContent = formatPercent(kpi.grossProfitRate);
}

// 選択中の月を4週に分けて、週ごとのレポートを表示します
function renderWeeklyReport(filteredSales) {
  const selectedMonth = monthFilterInput.value;
  const weeklyRanges = getWeeklyRanges(selectedMonth);
  const monthlyMetrics = calculateWeeklyMetrics(filteredSales);

  weeklySummaryLabel.textContent = `${formatMonthLabel(selectedMonth)}の週次サマリー（第1週〜第4週）`;
  weeklySummarySales.textContent = formatYen(monthlyMetrics.salesTotal);
  weeklySummaryProfit.textContent = formatYen(monthlyMetrics.profitTotal);
  weeklySummaryRate.textContent = formatPercent(monthlyMetrics.averageProfitRate);
  weeklySummaryCount.textContent = `${monthlyMetrics.count}件`;
  weeklyReportList.innerHTML = "";

  weeklyRanges.forEach(function (range) {
    const weeklySales = filteredSales.filter(function (sale) {
      const saleDay = Number(String(sale.saleDate || "").slice(8, 10));
      return saleDay >= range.startDay && saleDay <= range.endDay;
    });
    const metrics = calculateWeeklyMetrics(weeklySales);
    const card = document.createElement("article");
    card.className = "weekly-report-item";

    const header = document.createElement("div");
    header.className = "weekly-report-header";

    const period = document.createElement("div");
    period.className = "weekly-period";

    const title = document.createElement("h3");
    title.textContent = `第${range.weekNumber}週`;

    const dateRange = document.createElement("span");
    dateRange.textContent = `${Number(selectedMonth.slice(5, 7))}/${range.startDay}〜${Number(selectedMonth.slice(5, 7))}/${range.endDay}`;
    period.append(title, dateRange);

    const mainGrid = document.createElement("div");
    mainGrid.className = "weekly-main-grid";

    const mainItems = [
      ["売上", formatYen(metrics.salesTotal)],
      ["利益", formatYen(metrics.profitTotal), metrics.profitTotal >= 0 ? "profit-plus" : "profit-minus"],
      ["件数", `${metrics.count}件`]
    ];

    mainItems.forEach(function (item) {
      const box = document.createElement("div");
      box.className = "weekly-main-number";

      const label = document.createElement("span");
      label.textContent = item[0];

      const value = document.createElement("strong");
      value.textContent = item[1];

      if (item[2]) {
        value.className = item[2];
      }

      box.append(label, value);
      mainGrid.appendChild(box);
    });

    header.append(period, mainGrid);

    const detailGrid = document.createElement("div");
    detailGrid.className = "weekly-detail-grid";

    const detailItems = [
      ["平均売価", formatYen(metrics.averageSalePrice)],
      ["平均利益", formatYen(metrics.averageProfit)],
      ["利益率", formatPercent(metrics.averageProfitRate), "profit-plus"],
      ["原価率", formatPercent(metrics.costRate)],
      ["送料率", formatPercent(metrics.shippingRate)],
      ["手数料率", formatPercent(metrics.feeRate)],
      ["平均入金額", formatYen(metrics.averageDeposit)]
    ];

    detailItems.forEach(function (item) {
      const box = document.createElement("div");
      box.className = "weekly-detail-number";

      const label = document.createElement("span");
      label.textContent = item[0];

      const value = document.createElement("strong");
      value.textContent = item[1];

      if (item[2]) {
        value.className = item[2];
      }

      box.append(label, value);
      detailGrid.appendChild(box);
    });

    card.append(header, mainGrid, detailGrid);
    weeklyReportList.appendChild(card);
  });
}

// 選択中の月の売上を、販売日ごとにコンパクト表示します
function renderDailySales(filteredSales) {
  const dailyGroups = getDailySalesGroups(filteredSales);
  const summary = calculateSummary(filteredSales);
  const maxDailySales = Math.max(
    ...dailyGroups.map(function (dailyGroup) {
      return calculateSummary(dailyGroup.sales).salesTotal;
    }),
    1
  );

  dailySummarySales.textContent = formatYen(summary.salesTotal);
  dailySummaryProfit.textContent = formatYen(summary.profitTotal);
  dailySummaryCount.textContent = `${summary.count}件`;
  dailySummarySales.setAttribute("aria-label", `${formatMonthLabel(monthFilterInput.value)}の売上合計 ${formatYen(summary.salesTotal)}`);
  dailySummaryProfit.setAttribute("aria-label", `${formatMonthLabel(monthFilterInput.value)}の利益合計 ${formatYen(summary.profitTotal)}`);
  dailySummaryCount.setAttribute("aria-label", `${formatMonthLabel(monthFilterInput.value)}の登録件数 ${summary.count}件`);
  dailySalesList.innerHTML = "";

  if (dailyGroups.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "この月の日別売上はありません";
    dailySalesList.appendChild(empty);
    return;
  }

  dailyGroups.forEach(function (dailyGroup) {
    const metrics = calculateWeeklyMetrics(dailyGroup.sales);
    const card = document.createElement("article");
    card.className = "daily-sales-item";

    const dateArea = document.createElement("div");
    dateArea.className = "daily-date-area";

    const title = document.createElement("h3");
    const dayLabel = formatDayLabel(dailyGroup.dateText);
    title.textContent = dayLabel;

    const dateValue = parseDateText(dailyGroup.dateText);
    const weekday = document.createElement("span");
    weekday.textContent = dateValue ? `（${weekdays[dateValue.getDay()].shortName}）` : "";
    const bar = document.createElement("div");
    bar.className = "daily-volume-bar";
    bar.style.width = `${Math.max(metrics.salesTotal / maxDailySales * 100, 3)}%`;
    dateArea.append(title, weekday, bar);

    const salesValue = document.createElement("strong");
    salesValue.textContent = formatYen(metrics.salesTotal);
    salesValue.setAttribute("aria-label", `${dayLabel}の売上合計 ${formatYen(metrics.salesTotal)}`);

    const profitValue = document.createElement("strong");
    profitValue.className = metrics.profitTotal >= 0 ? "profit-plus" : "profit-minus";
    profitValue.textContent = formatYen(metrics.profitTotal);
    profitValue.setAttribute("aria-label", `${dayLabel}の利益合計 ${formatYen(metrics.profitTotal)}`);

    const countValue = document.createElement("strong");
    countValue.textContent = `${metrics.count}件`;
    countValue.setAttribute("aria-label", `${dayLabel}の登録件数 ${metrics.count}件`);

    // 日別売上は日々確認しやすいよう、指定された3項目だけを表示します
    card.append(dateArea, salesValue, profitValue, countValue);
    dailySalesList.appendChild(card);
  });
}

// 販路別集計を画面に表示します
function renderChannelSummary(filteredSales) {
  const channelColors = ["#ff3b0a", "#f6a800", "#2587e8", "#07934a"];
  const overallSummary = calculateSummary(filteredSales);
  const channelResults = salesChannels.map(function (channelName, index) {
    const channelSales = filteredSales.filter(function (sale) {
      return sale.salesChannel === channelName;
    });

    return {
      channelName,
      color: channelColors[index],
      summary: calculateSummary(channelSales)
    };
  });

  channelSummaryList.innerHTML = "";
  channelCompositionLegend.innerHTML = "";
  channelRateComparison.innerHTML = "";
  channelCompositionTotal.textContent = formatYen(overallSummary.salesTotal);

  let accumulatedPercent = 0;
  const gradientParts = channelResults.map(function (result) {
    const share = overallSummary.salesTotal === 0
      ? 0
      : result.summary.salesTotal / overallSummary.salesTotal * 100;
    const start = accumulatedPercent;
    accumulatedPercent += share;
    return `${result.color} ${start}% ${accumulatedPercent}%`;
  });
  channelCompositionChart.style.background = overallSummary.salesTotal === 0
    ? "#e8eaed"
    : `conic-gradient(${gradientParts.join(", ")})`;
  channelCompositionChart.setAttribute(
    "aria-label",
    overallSummary.salesTotal === 0
      ? "選択中の月は販路別売上がありません"
      : channelResults.map(function (result) {
        const share = result.summary.salesTotal / overallSummary.salesTotal * 100;
        return `${result.channelName} ${share.toFixed(1)}%`;
      }).join("、")
  );

  channelResults.forEach(function (result) {
    const share = overallSummary.salesTotal === 0
      ? 0
      : result.summary.salesTotal / overallSummary.salesTotal * 100;
    const legendItem = document.createElement("div");
    legendItem.className = "channel-legend-item";

    const swatch = document.createElement("span");
    swatch.className = "channel-swatch";
    swatch.style.backgroundColor = result.color;

    const legendText = document.createElement("div");
    const legendName = document.createElement("strong");
    legendName.textContent = result.channelName;
    const legendValue = document.createElement("span");
    legendValue.textContent = `${formatYen(result.summary.salesTotal)}（${share.toFixed(1)}%）`;
    legendText.append(legendName, legendValue);
    legendItem.append(swatch, legendText);
    channelCompositionLegend.appendChild(legendItem);

    const item = document.createElement("article");
    item.className = "channel-summary-item";
    item.style.setProperty("--channel-color", result.color);

    const title = document.createElement("h3");
    title.textContent = result.channelName;

    const marker = document.createElement("span");
    marker.className = "channel-card-marker";
    marker.style.backgroundColor = result.color;
    title.prepend(marker);

    const numberGrid = document.createElement("dl");
    numberGrid.className = "channel-number-grid";

    const numberItems = [
      ["売上", formatYen(result.summary.salesTotal)],
      ["原価", formatYen(result.summary.costTotal)],
      ["送料", formatYen(result.summary.shippingTotal)],
      ["手数料", formatYen(result.summary.feeTotal)],
      ["利益", formatYen(result.summary.profitTotal), "channel-profit-row"],
      ["加重利益率", formatPercent(result.summary.totalProfitRate), "channel-profit-row"],
      ["件数", `${result.summary.count}件`]
    ];

    numberItems.forEach(function (numberItem) {
      const row = document.createElement("div");

      if (numberItem[2]) {
        row.className = numberItem[2];
      }

      const label = document.createElement("dt");
      label.textContent = numberItem[0];

      const value = document.createElement("dd");
      value.textContent = numberItem[1];
      row.append(label, value);
      numberGrid.appendChild(row);
    });

    item.append(title, numberGrid);
    channelSummaryList.appendChild(item);

    const comparisonRow = document.createElement("div");
    comparisonRow.className = "channel-rate-row";

    const comparisonName = document.createElement("span");
    comparisonName.textContent = result.channelName;

    const comparisonTrack = document.createElement("div");
    comparisonTrack.className = "channel-rate-track";
    const comparisonBar = document.createElement("div");
    comparisonBar.style.width = `${Math.max(0, Math.min(result.summary.totalProfitRate, 100))}%`;
    comparisonBar.style.backgroundColor = result.color;
    comparisonTrack.appendChild(comparisonBar);

    const comparisonValue = document.createElement("strong");
    comparisonValue.textContent = formatPercent(result.summary.totalProfitRate);
    comparisonRow.append(comparisonName, comparisonTrack, comparisonValue);
    channelRateComparison.appendChild(comparisonRow);
  });

  const overallRow = document.createElement("div");
  overallRow.className = "channel-rate-row overall-rate-row";
  const overallName = document.createElement("span");
  overallName.textContent = "全体";
  const overallTrack = document.createElement("div");
  overallTrack.className = "channel-rate-track";
  const overallBar = document.createElement("div");
  overallBar.style.width = `${Math.max(0, Math.min(overallSummary.totalProfitRate, 100))}%`;
  overallTrack.appendChild(overallBar);
  const overallValue = document.createElement("strong");
  overallValue.textContent = formatPercent(overallSummary.totalProfitRate);
  overallRow.append(overallName, overallTrack, overallValue);
  channelRateComparison.appendChild(overallRow);
}

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// 外部ライブラリなしで、アクセシブルな月次SVGグラフの部品を作ります
function createSvgElement(elementName, attributes = {}) {
  const element = document.createElementNS(SVG_NAMESPACE, elementName);

  Object.entries(attributes).forEach(function (entry) {
    element.setAttribute(entry[0], String(entry[1]));
  });

  return element;
}

function renderMonthlyChart(selectedYear, monthlyGroups) {
  monthlyChart.innerHTML = "";
  const title = createSvgElement("title");
  title.textContent = `${selectedYear}年の月別売上と利益`;
  monthlyChart.appendChild(title);

  // データがない年度では、不自然な目盛りを描かず空状態だけを表示します
  if (monthlyGroups.length === 0) {
    const emptyTitle = createSvgElement("text", {
      x: 360,
      y: 138,
      "text-anchor": "middle",
      class: "monthly-chart-empty-title"
    });
    emptyTitle.textContent = "この年度の売上データはありません";

    const emptyDescription = createSvgElement("text", {
      x: 360,
      y: 172,
      "text-anchor": "middle",
      class: "monthly-chart-empty-description"
    });
    emptyDescription.textContent = "売上を登録すると、月別の売上と利益を表示します";

    monthlyChart.append(emptyTitle, emptyDescription);
    monthlyChart.setAttribute("aria-label", `${selectedYear}年の売上データはありません`);
    return;
  }

  const groupMap = new Map(monthlyGroups.map(function (group) {
    return [Number(group.month.slice(5, 7)), group.summary];
  }));
  const values = Array.from({ length: 12 }, function (_, index) {
    const summary = groupMap.get(index + 1) || calculateSummary([]);
    return {
      month: index + 1,
      sales: summary.salesTotal,
      profit: summary.profitTotal
    };
  });
  const chartValues = values.flatMap(function (value) {
    return [value.sales, value.profit];
  });
  // 0円を必ず範囲に含め、赤字の利益もSVG内へ収まる尺度にします
  const minimumValue = Math.min(0, ...chartValues);
  const maximumValue = Math.max(0, ...chartValues);
  const valueRange = Math.max(maximumValue - minimumValue, 1);
  const plotLeft = 64;
  const plotRight = 704;
  const plotTop = 30;
  const plotBottom = 252;
  const plotHeight = plotBottom - plotTop;
  const step = (plotRight - plotLeft) / 12;
  const getChartY = function (value) {
    const rawY = plotTop + (maximumValue - value) / valueRange * plotHeight;
    return Math.min(plotBottom, Math.max(plotTop, rawY));
  };
  const zeroY = getChartY(0);

  // 補助線と金額目盛りを先に描き、棒と折れ線が読み取りやすいようにします
  [0, 0.25, 0.5, 0.75, 1].forEach(function (ratio) {
    const y = plotTop + plotHeight * ratio;
    const line = createSvgElement("line", {
      x1: plotLeft,
      y1: y,
      x2: plotRight,
      y2: y,
      class: "monthly-grid-line"
    });
    const label = createSvgElement("text", {
      x: plotLeft - 8,
      y: y + 4,
      "text-anchor": "end",
      class: "monthly-axis-label"
    });
    const labelValue = maximumValue - valueRange * ratio;
    label.textContent = labelValue === 0
      ? "0"
      : Math.abs(labelValue) >= 100000
        ? `${Math.round(labelValue / 10000)}万`
        : Math.round(labelValue).toLocaleString();
    monthlyChart.append(line, label);
  });

  if (minimumValue < 0) {
    const zeroLine = createSvgElement("line", {
      x1: plotLeft,
      y1: zeroY,
      x2: plotRight,
      y2: zeroY,
      class: "monthly-zero-line"
    });
    monthlyChart.appendChild(zeroLine);
  }

  const profitPoints = [];

  values.forEach(function (value, index) {
    const centerX = plotLeft + step * index + step / 2;
    const salesY = getChartY(value.sales);
    const salesHeight = Math.abs(zeroY - salesY);
    const salesBar = createSvgElement("rect", {
      x: centerX - Math.min(16, step * 0.3),
      y: Math.min(zeroY, salesY),
      width: Math.min(32, step * 0.6),
      height: salesHeight,
      rx: 3,
      class: "monthly-sales-bar"
    });
    const barTitle = createSvgElement("title");
    barTitle.textContent = `${value.month}月 売上 ${formatYen(value.sales)}`;
    salesBar.appendChild(barTitle);

    const profitY = getChartY(value.profit);
    profitPoints.push(`${centerX},${profitY}`);

    const monthLabel = createSvgElement("text", {
      x: centerX,
      y: 278,
      "text-anchor": "middle",
      class: "monthly-month-label"
    });
    monthLabel.textContent = `${value.month}月`;
    monthlyChart.append(salesBar, monthLabel);
  });

  const profitLine = createSvgElement("polyline", {
    points: profitPoints.join(" "),
    class: "monthly-profit-line"
  });
  monthlyChart.appendChild(profitLine);

  values.forEach(function (value, index) {
    const centerX = plotLeft + step * index + step / 2;
    const profitY = getChartY(value.profit);
    const point = createSvgElement("circle", {
      cx: centerX,
      cy: profitY,
      r: 4,
      class: "monthly-profit-point"
    });
    const pointTitle = createSvgElement("title");
    pointTitle.textContent = `${value.month}月 利益 ${formatYen(value.profit)}`;
    point.appendChild(pointTitle);
    monthlyChart.appendChild(point);
  });

  const populatedValues = values.filter(function (value) {
    return value.sales !== 0 || value.profit !== 0;
  });
  monthlyChart.setAttribute(
    "aria-label",
    populatedValues.length === 0
      ? `${selectedYear}年の売上データはありません`
      : `${selectedYear}年の月別売上と利益。${populatedValues.map(function (value) {
        return `${value.month}月、売上${formatYen(value.sales)}、利益${formatYen(value.profit)}`;
      }).join("。")}`
  );
}

// 月別サマリーをグラフと新しい月順のカードで表示します
function renderMonthlySummary() {
  monthlySummaryList.innerHTML = "";
  updateSummaryYearOptions();
  const selectedYear = summaryYearSelect.value;
  const monthlyGroups = getMonthlySummaryGroups(selectedYear);
  renderMonthlyChart(selectedYear, monthlyGroups);

  if (monthlyGroups.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = `${selectedYear}年の月別サマリーを表示できるデータがありません。`;
    monthlySummaryList.appendChild(empty);
    return;
  }

  monthlyGroups.forEach(function (monthlyGroup) {
    const summary = monthlyGroup.summary;
    const button = document.createElement("button");
    button.className = "monthly-summary-item";
    button.type = "button";
    button.setAttribute("aria-label", `${formatMonthLabel(monthlyGroup.month)}を表示する月に設定`);

    const title = document.createElement("h3");
    title.className = "monthly-summary-title";
    title.textContent = formatMonthLabel(monthlyGroup.month);

    const numberGrid = document.createElement("div");
    numberGrid.className = "monthly-number-grid";
    const numberItems = [
      ["売上", formatYen(summary.salesTotal)],
      ["利益", formatYen(summary.profitTotal), "monthly-strong"],
      ["利益率", formatPercent(summary.totalProfitRate), "monthly-strong"],
      ["件数", `${summary.count}件`]
    ];

    numberItems.forEach(function (numberItem) {
      const box = document.createElement("div");
      box.className = "monthly-number";
      const label = document.createElement("span");
      label.textContent = numberItem[0];
      const value = document.createElement("strong");
      value.textContent = numberItem[1];

      if (numberItem[2]) {
        value.className = numberItem[2];
      }

      box.append(label, value);
      numberGrid.appendChild(box);
    });

    // カードを押すと、全画面で共有している表示月を同じ月へ切り替えます
    button.addEventListener("click", function () {
      monthFilterInput.value = monthlyGroup.month;
      renderDashboard();
    });

    button.append(title, numberGrid);
    monthlySummaryList.appendChild(button);
  });
}

// 登録済み一覧を画面に描画します
function renderSalesList(filteredSales) {
  salesList.innerHTML = "";
  itemCount.textContent = `${filteredSales.length}件`;
  emptyMessage.style.display = filteredSales.length === 0 ? "block" : "none";

  filteredSales.forEach(function (sale) {
    salesList.appendChild(createSaleCard(sale));
  });
}

// 選択中の月に合わせて、集計と一覧をまとめて更新します
function renderDashboard() {
  const filteredSales = getFilteredSales();
  const visibleSales = getVisibleSales(filteredSales);

  renderHome(filteredSales);
  renderMonthlySummary();
  renderTotalSummary(filteredSales);
  renderKpiSummary(filteredSales);
  renderWeeklyReport(filteredSales);
  renderDailySales(filteredSales);
  renderChannelSummary(filteredSales);
  renderAiAnalysisPreview();
  renderSalesList(visibleSales);
  monthCsvButtonLabel.textContent = `${formatMonthLabel(monthFilterInput.value)}をCSV出力`;

  if (getCurrentRoute().startsWith("data/sale/")) {
    renderSalePlaceholderRoute(getCurrentRoute());
  }
}

// 指定されたidの商品を削除します
function deleteSale(id) {
  if (!confirm("この商品を削除しますか？")) {
    return;
  }

  const nextSales = sales.filter(function (sale) {
    return !saleIdsMatch(sale.id, id);
  });

  if (!commitSales(nextSales, "商品を削除しました。")) {
    return;
  }

  if (editingSaleId !== null && saleIdsMatch(editingSaleId, id)) {
    resetForm();
  }

  renderDashboard();
}

// すべての商品データだけを削除します。折りたたみ状態などの設定は残します
function deleteAllData() {
  if (!confirm("すべての登録データを削除しますか？")) {
    return;
  }

  if (!confirm("本当に削除しますか？この操作は元に戻せません")) {
    return;
  }

  if (storageLoadBlocked) {
    showDataManagementStatus("壊れた保存データを保護しているため削除できません。JSONバックアップを復元してください。", "error");
    return;
  }

  if (canUseStorage) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      showDataManagementStatus("全データを削除できませんでした。元データを維持しています。", "error");
      return;
    }
  }

  sales = [];
  resetForm();
  renderDashboard();
  showDataManagementStatus("登録済みの売上データをすべて削除しました。");
}

// 月を変更したら、一覧と集計を自動で切り替えます
monthFilterInput.addEventListener("change", function () {
  renderDashboard();
});

// ブラウザの戻る・進む操作でも、表示画面と下部ナビを同期します
window.addEventListener("hashchange", function () {
  const requestedRoute = window.location.hash.replace(/^#\/?/, "");
  const normalizedRoute = getCurrentRoute();

  if (requestedRoute !== normalizedRoute) {
    window.location.replace(`#${normalizedRoute}`);
    return;
  }

  showRoute();
});

// 検索キーワードを入力したら、一覧だけを自動で絞り込みます
searchInput.addEventListener("input", function () {
  renderDashboard();
});

// 販路を選び直したら、一覧だけを自動で絞り込みます
channelFilter.addEventListener("change", function () {
  renderDashboard();
});

// 並び替え条件を選び直したら、一覧だけを並び替えます
sortSelect.addEventListener("change", function () {
  renderDashboard();
});

// 年度を変えたら、月別サマリーだけを選択年度に切り替えます
summaryYearSelect.addEventListener("change", function () {
  renderMonthlySummary();
});

includeAiItemDetails.addEventListener("change", function () {
  renderAiAnalysisPreview();
});

includeAiMemos.addEventListener("change", function () {
  renderAiAnalysisPreview();
});

refreshAiPreviewButton.addEventListener("click", function () {
  renderAiAnalysisPreview();
  showAiCopyStatus("AI分析用プレビューを更新しました。");
});

copyAiAnalysisButton.addEventListener("click", function () {
  copyAiAnalysisText();
});

placeholderEditButton.addEventListener("click", function () {
  if (placeholderSaleId !== null) {
    startEditSale(placeholderSaleId);
  }
});

placeholderDeleteButton.addEventListener("click", function () {
  if (placeholderSaleId === null) {
    return;
  }

  const deletingId = placeholderSaleId;
  deleteSale(deletingId);

  // キャンセル時は現在の商品が残るため、詳細画面もそのまま維持します
  if (!sales.some(function (sale) {
    return saleIdsMatch(sale.id, deletingId);
  })) {
    window.location.hash = "data/list";
  }
});

// 編集をやめたいときは、入力フォームだけを元に戻します
cancelEditButton.addEventListener("click", function () {
  resetForm();
});

// CSV出力ボタンが押されたら、全データをCSVとして保存します
exportCsvButton.addEventListener("click", function () {
  exportCsv();
});

// 表示中の月だけをCSVとして保存します
exportMonthCsvButton.addEventListener("click", function () {
  exportMonthCsv();
});

// 全データ削除ボタンが押されたら、2回確認してから削除します
deleteAllDataButton.addEventListener("click", function () {
  deleteAllData();
});

exportJsonBackupButton.addEventListener("click", function () {
  downloadJsonBackup();
});

jsonBackupInput.addEventListener("change", function () {
  const file = jsonBackupInput.files[0];

  if (file) {
    restoreJsonBackup(file);
  }
});

// CSVファイルが選ばれたら、まず検証結果だけを表示します
csvFileInput.addEventListener("change", function () {
  const file = csvFileInput.files[0];

  if (!file) {
    return;
  }

  stageCsvImport(file);
});

document.querySelectorAll("input[name='importMode']").forEach(function (radio) {
  radio.addEventListener("change", function () {
    updateCsvImportPreview();
  });
});

confirmCsvImportButton.addEventListener("click", function () {
  if (pendingJsonRestore) {
    confirmJsonRestore();
  } else {
    confirmCsvImport();
  }
});

cancelCsvImportButton.addEventListener("click", function () {
  const importType = pendingJsonRestore ? "JSON復元" : "CSV読み込み";
  clearPendingImportReview();
  showDataManagementStatus(`${importType}をキャンセルしました。`, "warning");
  window.location.hash = "data/manage";
});

// 編集中に画像を消したい場合は、削除予約をしてプレビューも消します
removeImageButton.addEventListener("click", function () {
  imageDeleteRequested = true;
  resizedImageData = "";
  imageResizePromise = Promise.resolve("");
  imageSelectionId += 1;
  itemImageInput.value = "";
  imagePreviewWrap.style.display = "none";
  imagePreview.removeAttribute("src");
  removeImageButton.style.display = "none";
  removeImageButton.disabled = true;
});

// 画像を選んだら、リサイズした画像を保存用に準備してプレビューも表示します
itemImageInput.addEventListener("change", async function () {
  imageSelectionId += 1;
  const currentSelectionId = imageSelectionId;
  const file = itemImageInput.files[0];

  if (!file) {
    resizedImageData = "";
    imageResizePromise = Promise.resolve("");
    imagePreviewWrap.style.display = "none";
    imagePreview.removeAttribute("src");
    removeImageButton.style.display = "none";
    removeImageButton.disabled = true;
    return;
  }

  imageDeleteRequested = false;
  imageResizePromise = resizeImage(file);

  try {
    const imageData = await imageResizePromise;

    // 別の画像を選び直していた場合は、古い画像をプレビューに使いません
    if (currentSelectionId !== imageSelectionId) {
      return;
    }

    resizedImageData = imageData;
    imagePreview.src = resizedImageData;
    imagePreviewWrap.style.display = "block";
    removeImageButton.style.display = "block";
    removeImageButton.disabled = false;
  } catch (error) {
    resizedImageData = "";
    imageResizePromise = Promise.resolve("");
    imagePreviewWrap.style.display = "none";
    imagePreview.removeAttribute("src");
    removeImageButton.style.display = "none";
    removeImageButton.disabled = true;
    alert("画像を読み込めませんでした。別の画像を選んでください。");
  }
});

// フォームの「登録する」ボタンが押されたときに実行されます
form.addEventListener("submit", async function (event) {
  // フォーム送信でページが再読み込みされないようにします
  event.preventDefault();

  // 画像を選んでいる場合は、リサイズ処理が終わるまで待ちます
  try {
    await imageResizePromise;
  } catch (error) {
    alert("画像を読み込めませんでした。別の画像を選ぶか、画像なしで登録してください。");
    return;
  }

  // 入力された値を取得します
  const saleDate = document.getElementById("saleDate").value;
  const purchaseDate = document.getElementById("purchaseDate").value;
  const salesChannel = document.getElementById("salesChannel").value;
  const itemName = document.getElementById("itemName").value.trim();
  const salePrice = Number(document.getElementById("salePrice").value);
  const costPrice = Number(document.getElementById("costPrice").value);
  const shippingFee = Number(document.getElementById("shippingFee").value);
  const feeRate = Number(document.getElementById("feeRate").value);
  const memo = document.getElementById("memo").value.trim();
  const errors = validateSaleInput({
    saleDate,
    purchaseDate,
    salesChannel,
    itemName,
    salePrice,
    costPrice,
    shippingFee,
    feeRate
  });

  // エラーがある場合は、登録・更新せずに内容を表示します
  if (errors.length > 0) {
    showFormErrors(errors);
    return;
  }

  clearFormErrors();

  const calculated = calculateProfit(salePrice, costPrice, shippingFee, feeRate);
  const saleDays = calculateSaleDays(saleDate, purchaseDate);
  const existingSale = editingSaleId === null
    ? null
    : sales.find(function (targetSale) {
      return saleIdsMatch(targetSale.id, editingSaleId);
    });

  // 登録または更新する1件分のデータを作ります
  const sale = {
    // 編集時は既存データを先にコピーし、将来追加される未知の項目も消さないようにします
    ...(existingSale || {}),
    id: editingSaleId ?? createUniqueSaleId(new Set(sales.map(function (targetSale) {
      return getSaleIdKey(targetSale.id);
    }))),
    saleDate,
    purchaseDate,
    salesChannel,
    itemName,
    salePrice,
    costPrice,
    shippingFee,
    feeRate,
    fee: calculated.fee,
    profit: calculated.profit,
    profitRate: calculated.profitRate,
    saleDays,
    imageData: imageDeleteRequested ? "" : resizedImageData,
    memo
  };

  let nextSales;

  if (editingSaleId !== null) {
    // 編集中のときは、新規追加せず既存データを上書きします
    nextSales = sales.map(function (targetSale) {
      return saleIdsMatch(targetSale.id, editingSaleId) ? sale : targetSale;
    });
  } else {
    // 新規登録のときは、一覧の先頭に追加します
    nextSales = [sale, ...sales];
  }

  const successMessage = editingSaleId !== null ? "商品データを更新しました。" : "商品データを登録しました。";

  if (!commitSales(nextSales, successMessage)) {
    return;
  }

  renderDashboard();

  // 次の商品を入力しやすいようにフォームを初期状態へ戻します
  resetForm();
});

// ページを開いたときに、日付の初期値と保存済みデータを準備します
monthFilterInput.value = getCurrentMonthText();
loadSales();

// 既存の売上配列形式は変えず、別キーにスキーマ情報だけを保存します
if (!storageLoadBlocked) {
  saveAppMeta(loadAppMeta());
}

resetForm();
// 折りたたみUIは廃止しても、JSON互換のため保存済み設定は読み込みます
loadCollapsedSections();
renderDashboard();

const initialRequestedRoute = window.location.hash.replace(/^#\/?/, "");
const initialRoute = getCurrentRoute();

if (initialRequestedRoute !== initialRoute) {
  window.location.replace(`#${initialRoute}`);
} else {
  showRoute({ skipScroll: true });
}
