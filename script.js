// HTMLのフォームと、一覧を表示する場所を取得します
const form = document.getElementById("salesForm");
const salesList = document.getElementById("salesList");
const emptyMessage = document.getElementById("emptyMessage");
const itemCount = document.getElementById("itemCount");
const saleDateInput = document.getElementById("saleDate");
const monthFilterInput = document.getElementById("monthFilter");
const totalSales = document.getElementById("totalSales");
const totalProfit = document.getElementById("totalProfit");
const averageProfitRate = document.getElementById("averageProfitRate");
const summaryCount = document.getElementById("summaryCount");
const channelSummaryList = document.getElementById("channelSummaryList");

// localStorageで使う保存名です
const STORAGE_KEY = "usedClothesSales";

// localStorageが使えるブラウザかどうかを確認します
const canUseStorage = typeof localStorage !== "undefined";

// 登録済みデータを入れておく配列です
let sales = [];

// 販路別集計で表示する販路の一覧です
const salesChannels = ["メルカリメイン", "メルカリサブ", "ヤフー", "ラクマ"];

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

// 選択中の月に含まれるデータだけを取り出します
function getFilteredSales() {
  const selectedMonth = monthFilterInput.value;

  return sales.filter(function (sale) {
    return sale.saleDate && sale.saleDate.slice(0, 7) === selectedMonth;
  });
}

// 集計に使う合計値や平均値を計算します
function calculateSummary(targetSales) {
  const salesTotal = targetSales.reduce(function (total, sale) {
    return total + sale.salePrice;
  }, 0);

  const profitTotal = targetSales.reduce(function (total, sale) {
    return total + sale.profit;
  }, 0);

  // 平均利益率は、各商品の利益率を足して件数で割っています
  const profitRateTotal = targetSales.reduce(function (total, sale) {
    return total + sale.profitRate;
  }, 0);

  const averageRate = targetSales.length === 0 ? 0 : profitRateTotal / targetSales.length;

  // 販路別集計では、利益合計を売上合計で割った利益率も使います
  const totalProfitRate = salesTotal === 0 ? 0 : profitTotal / salesTotal * 100;

  return {
    salesTotal,
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

// 1つの商品カードを作ります
function createSaleCard(sale) {
  const card = document.createElement("article");
  card.className = "sale-card";

  const header = document.createElement("div");
  header.className = "sale-card-header";

  const date = document.createElement("span");
  date.className = "sale-date";
  date.textContent = sale.saleDate;

  const title = document.createElement("h3");
  title.className = "sale-title";
  title.textContent = sale.itemName;

  const channel = document.createElement("span");
  channel.className = "sale-channel";
  channel.textContent = sale.salesChannel;

  header.append(date, title, channel);

  const numbers = document.createElement("div");
  numbers.className = "sale-numbers";

  const numberItems = [
    ["売値", formatYen(sale.salePrice)],
    ["仕入れ値", formatYen(sale.costPrice)],
    ["送料", formatYen(sale.shippingFee)],
    ["手数料", formatYen(sale.fee)],
    ["利益", formatYen(sale.profit), sale.profit >= 0 ? "profit-plus" : "profit-minus"],
    ["利益率", formatPercent(sale.profitRate), sale.profit >= 0 ? "profit-plus" : "profit-minus"]
  ];

  numberItems.forEach(function (item) {
    const box = document.createElement("div");
    box.className = "number-box";

    const label = document.createElement("span");
    label.textContent = item[0];

    const value = document.createElement("strong");
    value.textContent = item[1];

    if (item[2]) {
      value.className = item[2];
    }

    box.append(label, value);
    numbers.appendChild(box);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "削除";

  // 削除ボタンが押されたら、この商品のidを使って削除します
  deleteButton.addEventListener("click", function () {
    deleteSale(sale.id);
  });

  card.append(header, numbers);

  if (sale.memo) {
    const memo = document.createElement("p");
    memo.className = "sale-memo";
    memo.textContent = sale.memo;
    card.appendChild(memo);
  }

  card.appendChild(deleteButton);

  return card;
}

// 全体集計を画面に表示します
function renderTotalSummary(filteredSales) {
  const summary = calculateSummary(filteredSales);

  totalSales.textContent = formatYen(summary.salesTotal);
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

  renderTotalSummary(filteredSales);
  renderChannelSummary(filteredSales);
  renderSalesList(filteredSales);
}

// 指定されたidの商品を削除します
function deleteSale(id) {
  sales = sales.filter(function (sale) {
    return sale.id !== id;
  });

  saveSales();
  renderDashboard();
}

// 月を変更したら、一覧と集計を自動で切り替えます
monthFilterInput.addEventListener("change", function () {
  renderDashboard();
});

// フォームの「登録する」ボタンが押されたときに実行されます
form.addEventListener("submit", function (event) {
  // フォーム送信でページが再読み込みされないようにします
  event.preventDefault();

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

  // 登録する1件分のデータを作ります
  const sale = {
    id: Date.now(),
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
    memo
  };

  // 新しいデータを先頭に追加して、保存と再表示をします
  sales.unshift(sale);
  saveSales();
  renderDashboard();

  // 次の商品を入力しやすいようにフォームを初期状態へ戻します
  form.reset();
  saleDateInput.value = getTodayText();
  document.getElementById("feeRate").value = "10";
});

// ページを開いたときに、日付の初期値と保存済みデータを準備します
saleDateInput.value = getTodayText();
monthFilterInput.value = getCurrentMonthText();
loadSales();
renderDashboard();
