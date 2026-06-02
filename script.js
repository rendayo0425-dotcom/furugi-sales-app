// HTMLのフォームと、一覧を表示する場所を取得します
const form = document.getElementById("salesForm");
const salesList = document.getElementById("salesList");
const emptyMessage = document.getElementById("emptyMessage");
const itemCount = document.getElementById("itemCount");
const saleDateInput = document.getElementById("saleDate");
const monthFilterInput = document.getElementById("monthFilter");
const totalSales = document.getElementById("totalSales");
const totalCost = document.getElementById("totalCost");
const totalShipping = document.getElementById("totalShipping");
const totalFee = document.getElementById("totalFee");
const totalProfit = document.getElementById("totalProfit");
const averageProfitRate = document.getElementById("averageProfitRate");
const summaryCount = document.getElementById("summaryCount");
const channelSummaryList = document.getElementById("channelSummaryList");
const monthlySummaryList = document.getElementById("monthlySummaryList");
const summaryYearSelect = document.getElementById("summaryYearSelect");
const itemImageInput = document.getElementById("itemImage");
const imagePreviewWrap = document.getElementById("imagePreviewWrap");
const imagePreview = document.getElementById("imagePreview");
const formTitle = document.getElementById("formTitle");
const editStatus = document.getElementById("editStatus");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const exportCsvButton = document.getElementById("exportCsvButton");
const csvFileInput = document.getElementById("csvFileInput");
const searchInput = document.getElementById("searchInput");
const channelFilter = document.getElementById("channelFilter");
const sortSelect = document.getElementById("sortSelect");

// localStorageで使う保存名です
const STORAGE_KEY = "usedClothesSales";
const COLLAPSE_STORAGE_KEY = "usedClothesCollapsedSections";

// localStorageが使えるブラウザかどうかを確認します
const canUseStorage = typeof localStorage !== "undefined";

// 登録済みデータを入れておく配列です
let sales = [];

// セクションごとの折りたたみ状態を入れておくオブジェクトです
let collapsedSections = {};

// 編集中の商品idです。nullのときは新規登録モードです
let editingSaleId = null;

// 選択中の画像をリサイズしたBase64文字列として一時的に入れておきます
let resizedImageData = "";

// 画像リサイズが終わるまで待つためのPromiseです
let imageResizePromise = Promise.resolve("");

// 画像を選び直したとき、古いリサイズ結果を使わないための番号です
let imageSelectionId = 0;

// 販路別集計で表示する販路の一覧です
const salesChannels = ["メルカリメイン", "メルカリサブ", "ヤフー", "ラクマ"];

// CSVに出力する列の名前です。画像データは重いので含めません
const csvHeaders = [
  "id",
  "販売日",
  "販路",
  "商品名",
  "売値",
  "仕入れ値",
  "送料",
  "販売手数料率",
  "手数料",
  "利益",
  "利益率",
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

// CSV内でカンマや改行があっても崩れないように、値をダブルクォートで囲みます
function escapeCsvValue(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

// 1件の商品データをCSVの1行分に変換します
function saleToCsvRow(sale) {
  return [
    sale.id,
    sale.saleDate,
    sale.salesChannel,
    sale.itemName,
    sale.salePrice,
    sale.costPrice,
    sale.shippingFee,
    sale.feeRate,
    sale.fee,
    sale.profit,
    sale.profitRate,
    sale.memo
  ].map(escapeCsvValue).join(",");
}

// CSVテキストを作ります。Excelで開きやすいようにBOMも先頭に付けます
function buildCsvText() {
  const headerRow = csvHeaders.map(escapeCsvValue).join(",");
  const dataRows = sales.map(saleToCsvRow);

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

// CSVの文字列データを、アプリで使う商品データの形に戻します
function csvRowToSale(headerIndexes, row) {
  const salePrice = Number(row[headerIndexes["売値"]] || 0);
  const costPrice = Number(row[headerIndexes["仕入れ値"]] || 0);
  const shippingFee = Number(row[headerIndexes["送料"]] || 0);
  const feeRate = Number(row[headerIndexes["販売手数料率"]] || 0);
  const calculated = calculateProfit(salePrice, costPrice, shippingFee, feeRate);
  const importedId = Number(row[headerIndexes.id]);

  return {
    id: importedId || Date.now() + Math.floor(Math.random() * 100000),
    saleDate: row[headerIndexes["販売日"]] || getTodayText(),
    salesChannel: row[headerIndexes["販路"]] || "メルカリメイン",
    itemName: row[headerIndexes["商品名"]] || "名称未設定",
    salePrice,
    costPrice,
    shippingFee,
    feeRate,
    fee: Number(row[headerIndexes["手数料"]]) || calculated.fee,
    profit: Number(row[headerIndexes["利益"]]) || calculated.profit,
    profitRate: Number(row[headerIndexes["利益率"]]) || calculated.profitRate,
    imageData: "",
    memo: row[headerIndexes["メモ"]] || ""
  };
}

// CSVファイルの内容を、登録データ配列に変換します
function csvTextToSales(csvText) {
  const rows = parseCsvText(csvText);
  const headers = rows[0] || [];
  const headerIndexes = {};

  headers.forEach(function (header, index) {
    headerIndexes[header] = index;
  });

  return rows.slice(1).map(function (row) {
    return csvRowToSale(headerIndexes, row);
  });
}

// CSVファイルをダウンロードします
function exportCsv() {
  if (sales.length === 0) {
    alert("出力するデータがありません。");
    return;
  }

  const csvText = buildCsvText();
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `sales-data-${getTodayText()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// CSV読み込み時、idが重複しないように調整します
function ensureUniqueImportedIds(importedSales, baseSales) {
  const usedIds = new Set(baseSales.map(function (sale) {
    return sale.id;
  }));

  return importedSales.map(function (sale) {
    if (usedIds.has(sale.id)) {
      sale.id = Date.now() + Math.floor(Math.random() * 100000);
    }

    usedIds.add(sale.id);
    return sale;
  });
}

// CSVファイルを読み込み、追加または置き換えでアプリに反映します
function importCsv(file, importMode) {
  const reader = new FileReader();

  reader.onload = function () {
    const importedSales = csvTextToSales(reader.result);

    if (importedSales.length === 0) {
      alert("読み込めるデータがありませんでした。");
      csvFileInput.value = "";
      return;
    }

    const isReplaceMode = importMode === "replace";
    const message = isReplaceMode
      ? "現在のデータをCSVの内容で置き換えます。よろしいですか？"
      : "CSVの内容を現在のデータに追加します。よろしいですか？";

    if (!confirm(message)) {
      csvFileInput.value = "";
      return;
    }

    // CSVには画像を含めないため、読み込んだ商品は画像なしになります
    const baseSales = isReplaceMode ? [] : sales;
    const safeImportedSales = ensureUniqueImportedIds(importedSales, baseSales);

    sales = isReplaceMode ? safeImportedSales : [...safeImportedSales, ...sales];
    saveSales();
    resetForm();
    renderDashboard();
    csvFileInput.value = "";
  };

  reader.onerror = function () {
    alert("CSVファイルを読み込めませんでした。");
    csvFileInput.value = "";
  };

  reader.readAsText(file, "utf-8");
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

// localStorageから登録済みデータを読み込みます
function loadSales() {
  if (!canUseStorage) {
    return;
  }

  const savedSales = localStorage.getItem(STORAGE_KEY);

  if (savedSales) {
    sales = JSON.parse(savedSales);
  }
}

// 現在の登録済みデータをlocalStorageに保存します
function saveSales() {
  if (!canUseStorage) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
}

// localStorageからセクションの折りたたみ状態を読み込みます
function loadCollapsedSections() {
  if (!canUseStorage) {
    collapsedSections = {};
    return;
  }

  const savedState = localStorage.getItem(COLLAPSE_STORAGE_KEY);

  if (!savedState) {
    collapsedSections = {};
    return;
  }

  try {
    collapsedSections = JSON.parse(savedState);
  } catch (error) {
    collapsedSections = {};
  }
}

// セクションの折りたたみ状態をlocalStorageに保存します
function saveCollapsedSections() {
  if (!canUseStorage) {
    return;
  }

  localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(collapsedSections));
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
  imagePreviewWrap.style.display = "none";
  imagePreview.removeAttribute("src");
  itemImageInput.value = "";
}

// フォームを新規登録モードに戻します
function resetForm() {
  form.reset();
  saleDateInput.value = getTodayText();
  document.getElementById("feeRate").value = "10";
  editingSaleId = null;
  formTitle.textContent = "売上を登録";
  submitButton.textContent = "登録する";
  editStatus.style.display = "none";
  cancelEditButton.style.display = "none";
  resetImageInput();
}

// 編集ボタンが押された商品データをフォームへ戻します
function startEditSale(id) {
  const sale = sales.find(function (targetSale) {
    return targetSale.id === id;
  });

  if (!sale) {
    return;
  }

  editingSaleId = id;
  imageSelectionId += 1;
  document.getElementById("saleDate").value = sale.saleDate;
  document.getElementById("salesChannel").value = sale.salesChannel;
  document.getElementById("itemName").value = sale.itemName;
  document.getElementById("salePrice").value = sale.salePrice;
  document.getElementById("costPrice").value = sale.costPrice;
  document.getElementById("shippingFee").value = sale.shippingFee;
  document.getElementById("feeRate").value = sale.feeRate || "10";
  document.getElementById("memo").value = sale.memo || "";

  // 既存画像がある場合は、画像データを保持してプレビューも表示します
  resizedImageData = sale.imageData || "";
  imageResizePromise = Promise.resolve(resizedImageData);
  itemImageInput.value = "";

  if (resizedImageData) {
    imagePreview.src = resizedImageData;
    imagePreviewWrap.style.display = "block";
  } else {
    imagePreviewWrap.style.display = "none";
    imagePreview.removeAttribute("src");
  }

  formTitle.textContent = "売上を編集";
  submitButton.textContent = "更新する";
  editStatus.style.display = "block";
  cancelEditButton.style.display = "block";
  setSectionCollapsed("salesForm", false);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 1つの商品カードを作ります
function createSaleCard(sale) {
  const card = document.createElement("article");
  card.className = "sale-card";

  const compactRow = document.createElement("div");
  compactRow.className = "sale-compact-row";

  // 画像ありならサムネイル、画像なしなら分かりやすい枠を表示します
  if (sale.imageData) {
    const image = document.createElement("img");
    image.className = "sale-image";
    image.src = sale.imageData;
    image.alt = `${sale.itemName}の商品画像`;
    compactRow.appendChild(image);
  } else {
    const noImage = document.createElement("div");
    noImage.className = "sale-no-image";
    noImage.textContent = "画像なし";
    compactRow.appendChild(noImage);
  }

  const mainInfo = document.createElement("div");
  mainInfo.className = "sale-main-info";

  const meta = document.createElement("div");
  meta.className = "sale-meta";

  const date = document.createElement("span");
  date.className = "sale-date";
  date.textContent = sale.saleDate;

  const channel = document.createElement("span");
  channel.className = "sale-channel";
  channel.textContent = sale.salesChannel;

  meta.append(date, channel);

  const title = document.createElement("h3");
  title.className = "sale-title";
  title.textContent = sale.itemName;

  const compactNumbers = document.createElement("div");
  compactNumbers.className = "sale-compact-numbers";

  const compactNumberItems = [
    ["売値", formatYen(sale.salePrice)],
    ["利益", formatYen(sale.profit), sale.profit >= 0 ? "profit-plus" : "profit-minus"],
    ["利益率", formatPercent(sale.profitRate), sale.profit >= 0 ? "profit-plus" : "profit-minus"]
  ];

  compactNumberItems.forEach(function (item) {
    const box = document.createElement("div");
    box.className = "compact-number";

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
  compactRow.appendChild(mainInfo);

  const details = document.createElement("div");
  details.className = "sale-details";
  details.hidden = true;

  const detailNumbers = document.createElement("div");
  detailNumbers.className = "sale-detail-numbers";

  const numberItems = [
    ["原価", formatYen(sale.costPrice)],
    ["送料", formatYen(sale.shippingFee)],
    ["手数料", formatYen(sale.fee)],
    ["販売手数料率", formatPercent(Number(sale.feeRate || 0))]
  ];

  numberItems.forEach(function (item) {
    const box = document.createElement("div");
    box.className = "detail-number";

    const label = document.createElement("span");
    label.textContent = item[0];

    const value = document.createElement("strong");
    value.textContent = item[1];

    if (item[2]) {
      value.className = item[2];
    }

    box.append(label, value);
    detailNumbers.appendChild(box);
  });

  details.appendChild(detailNumbers);

  const actionArea = document.createElement("div");
  actionArea.className = "sale-actions";

  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.type = "button";
  editButton.textContent = "編集";

  // 編集ボタンが押されたら、この商品の内容を入力フォームに戻します
  editButton.addEventListener("click", function () {
    startEditSale(sale.id);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "削除";

  // 削除ボタンが押されたら、この商品のidを使って削除します
  deleteButton.addEventListener("click", function () {
    deleteSale(sale.id);
  });

  actionArea.append(editButton, deleteButton);

  const memo = document.createElement("p");
  memo.className = "sale-memo";
  memo.textContent = sale.memo || "メモなし";
  details.appendChild(memo);

  details.appendChild(actionArea);

  const detailButton = document.createElement("button");
  detailButton.className = "detail-toggle-button";
  detailButton.type = "button";
  detailButton.textContent = "詳細";

  // 詳細ボタンで、原価・送料・手数料・メモ・編集削除ボタンを開閉します
  detailButton.addEventListener("click", function () {
    const isOpening = details.hidden;
    details.hidden = !isOpening;
    detailButton.textContent = isOpening ? "閉じる" : "詳細";
  });

  compactRow.appendChild(detailButton);
  card.append(compactRow, details);

  return card;
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

// 販路別集計を画面に表示します
function renderChannelSummary(filteredSales) {
  channelSummaryList.innerHTML = "";

  salesChannels.forEach(function (channelName) {
    const channelSales = filteredSales.filter(function (sale) {
      return sale.salesChannel === channelName;
    });

    const summary = calculateSummary(channelSales);
    const item = document.createElement("article");
    item.className = "channel-summary-item";

    const title = document.createElement("h3");
    title.className = "channel-summary-title";
    title.textContent = channelName;

    const numberGrid = document.createElement("div");
    numberGrid.className = "channel-number-grid";

    const numberItems = [
      ["売上合計", formatYen(summary.salesTotal)],
      ["原価合計", formatYen(summary.costTotal)],
      ["送料合計", formatYen(summary.shippingTotal)],
      ["手数料合計", formatYen(summary.feeTotal)],
      ["利益合計", formatYen(summary.profitTotal)],
      ["平均利益率", formatPercent(summary.totalProfitRate)],
      ["登録件数", `${summary.count}件`]
    ];

    numberItems.forEach(function (numberItem) {
      const box = document.createElement("div");
      box.className = "channel-number";

      const label = document.createElement("span");
      label.textContent = numberItem[0];

      const value = document.createElement("strong");
      value.textContent = numberItem[1];

      box.append(label, value);
      numberGrid.appendChild(box);
    });

    item.append(title, numberGrid);
    channelSummaryList.appendChild(item);
  });
}

// 月別サマリーを画面に表示します
function renderMonthlySummary() {
  monthlySummaryList.innerHTML = "";
  updateSummaryYearOptions();
  const selectedYear = summaryYearSelect.value;
  const monthlyGroups = getMonthlySummaryGroups(selectedYear);

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

    const title = document.createElement("h3");
    title.className = "monthly-summary-title";
    title.textContent = formatMonthLabel(monthlyGroup.month);

    const numberGrid = document.createElement("div");
    numberGrid.className = "monthly-number-grid";

    const numberItems = [
      ["売上合計", formatYen(summary.salesTotal)],
      ["原価合計", formatYen(summary.costTotal)],
      ["送料合計", formatYen(summary.shippingTotal)],
      ["手数料合計", formatYen(summary.feeTotal)],
      ["利益合計", formatYen(summary.profitTotal), "monthly-strong"],
      ["平均利益率", formatPercent(summary.totalProfitRate), "monthly-strong"],
      ["登録件数", `${summary.count}件`]
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

    // 月別サマリーを押したら、既存の月フィルターをその月に切り替えます
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

  renderMonthlySummary();
  renderTotalSummary(filteredSales);
  renderChannelSummary(filteredSales);
  renderSalesList(visibleSales);
}

// 指定されたidの商品を削除します
function deleteSale(id) {
  sales = sales.filter(function (sale) {
    return sale.id !== id;
  });

  if (editingSaleId === id) {
    resetForm();
  }

  saveSales();
  renderDashboard();
}

// 月を変更したら、一覧と集計を自動で切り替えます
monthFilterInput.addEventListener("change", function () {
  renderDashboard();
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

// 編集をやめたいときは、入力フォームだけを元に戻します
cancelEditButton.addEventListener("click", function () {
  resetForm();
});

// CSV出力ボタンが押されたら、全データをCSVとして保存します
exportCsvButton.addEventListener("click", function () {
  exportCsv();
});

// CSVファイルが選ばれたら、追加または置き換えで読み込みます
csvFileInput.addEventListener("change", function () {
  const file = csvFileInput.files[0];

  if (!file) {
    return;
  }

  const importMode = document.querySelector("input[name='importMode']:checked").value;
  importCsv(file, importMode);
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
    return;
  }

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
  } catch (error) {
    resizedImageData = "";
    imageResizePromise = Promise.resolve("");
    imagePreviewWrap.style.display = "none";
    imagePreview.removeAttribute("src");
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
  const salesChannel = document.getElementById("salesChannel").value;
  const itemName = document.getElementById("itemName").value;
  const salePrice = Number(document.getElementById("salePrice").value);
  const costPrice = Number(document.getElementById("costPrice").value);
  const shippingFee = Number(document.getElementById("shippingFee").value);
  const feeRate = Number(document.getElementById("feeRate").value);
  const memo = document.getElementById("memo").value;

  const calculated = calculateProfit(salePrice, costPrice, shippingFee, feeRate);

  // 登録または更新する1件分のデータを作ります
  const sale = {
    id: editingSaleId || Date.now(),
    saleDate,
    salesChannel,
    itemName,
    salePrice,
    costPrice,
    shippingFee,
    feeRate,
    fee: calculated.fee,
    profit: calculated.profit,
    profitRate: calculated.profitRate,
    imageData: resizedImageData,
    memo
  };

  if (editingSaleId) {
    // 編集中のときは、新規追加せず既存データを上書きします
    sales = sales.map(function (targetSale) {
      return targetSale.id === editingSaleId ? sale : targetSale;
    });
  } else {
    // 新規登録のときは、一覧の先頭に追加します
    sales.unshift(sale);
  }

  saveSales();
  renderDashboard();

  // 次の商品を入力しやすいようにフォームを初期状態へ戻します
  resetForm();
});

// ページを開いたときに、日付の初期値と保存済みデータを準備します
monthFilterInput.value = getCurrentMonthText();
loadSales();
resetForm();
setupSectionToggles();
renderDashboard();
