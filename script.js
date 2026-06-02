// HTMLのフォームと、結果を表示する場所を取得します
const form = document.getElementById("profitForm");
const feeResult = document.getElementById("feeResult");
const profitResult = document.getElementById("profitResult");
const profitRateResult = document.getElementById("profitRateResult");

// 数字を「1,000円」のように見やすい円表示へ変換します
function formatYen(value) {
  return `${Math.round(value).toLocaleString()}円`;
}

// 数字を「25.5%」のように小数1桁のパーセント表示へ変換します
function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

// フォームの「計算する」ボタンが押されたときに実行されます
form.addEventListener("submit", function (event) {
  // フォーム送信でページが再読み込みされないようにします
  event.preventDefault();

  // 入力された値を数値として取得します
  const salePrice = Number(document.getElementById("salePrice").value);
  const costPrice = Number(document.getElementById("costPrice").value);
  const shippingFee = Number(document.getElementById("shippingFee").value);
  const feeRate = Number(document.getElementById("feeRate").value);

  // 指定された計算式で手数料、利益、利益率を計算します
  const fee = salePrice * feeRate / 100;
  const profit = salePrice - fee - costPrice - shippingFee;
  const profitRate = salePrice === 0 ? 0 : profit / salePrice * 100;

  // 計算結果を画面に表示します
  feeResult.textContent = formatYen(fee);
  profitResult.textContent = formatYen(profit);
  profitRateResult.textContent = formatPercent(profitRate);
});
