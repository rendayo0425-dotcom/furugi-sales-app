// HTMLのフォームと、一覧を表示する場所を取得します
const form = document.getElementById("salesForm");
const salesList = document.getElementById("salesList");
const emptyMessage = document.getElementById("emptyMessage");
const itemCount = document.getElementById("itemCount");
const saleDateInput = document.getElementById("saleDate");

// localStorageで使う保存名です
const STORAGE_KEY = "usedClothesSales";

// localStorageが使えるブラウザかどうかを確認します
const canUseStorage = typeof localStorage !== "undefined";

// 登録済みデータを入れておく配列です
let sales = [];

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

// 登録済み一覧を画面に描画します
function renderSales() {
  salesList.innerHTML = "";
  itemCount.textContent = `${sales.length}件`;
  emptyMessage.style.display = sales.length === 0 ? "block" : "none";

  sales.forEach(function (sale) {
    salesList.appendChild(createSaleCard(sale));
  });
}

// 指定されたidの商品を削除します
function deleteSale(id) {
  sales = sales.filter(function (sale) {
    return sale.id !== id;
  });

  saveSales();
  renderSales();
}

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
  renderSales();

  // 次の商品を入力しやすいようにフォームを初期状態へ戻します
  form.reset();
  saleDateInput.value = getTodayText();
  document.getElementById("feeRate").value = "10";
});

// ページを開いたときに、日付の初期値と保存済みデータを準備します
saleDateInput.value = getTodayText();
loadSales();
renderSales();
