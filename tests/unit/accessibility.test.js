const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("登録フォームは任意数値を必須にせず、各入力欄のエラー領域を持つ", function () {
  ["costPrice", "shippingFee", "feeRate"].forEach(function (fieldId) {
    const fieldMatch = html.match(new RegExp(`<input id="${fieldId}"[^>]*>`));
    assert.ok(fieldMatch, `${fieldId}が必要です`);
    assert.doesNotMatch(fieldMatch[0], /\brequired\b/);
  });

  ["saleDate", "purchaseDate", "salesChannel", "itemName", "salePrice", "costPrice", "shippingFee", "feeRate"].forEach(function (fieldId) {
    assert.match(html, new RegExp(`id="${fieldId}Error"`));
    assert.match(script, new RegExp(`fieldId: "${fieldId}"`));
  });
});

test("画面見出し・利益状態・AIメモ確認のアクセシビリティ処理を持つ", function () {
  assert.match(html, /<h1 id="routeTitle" tabindex="-1">/);
  assert.match(html, /id="includeAiMemos" type="checkbox"><span>メモを含める/);
  assert.match(script, /document\.title = `\$\{route === "home" \? "ホーム" : titleText\}｜古着売上管理`/);
  assert.match(script, /function applyProfitState\(/);
  assert.match(script, /メモに個人情報が含まれていないことを確認しましたか/);
  assert.match(script, /copyAiAnalysisButton\.focus\(\)/);
});

test("顧客向けの指標名と販売商品数の単位を表示する", function () {
  assert.match(html, /平均商品利益率（単純平均）/);
  assert.match(html, /商品利益率（売上加重）/);
  assert.match(html, /売れた商品の販売日数/);
  assert.match(html, /現在庫は含みません/);
  assert.doesNotMatch(html, />登録件数</);
  assert.doesNotMatch(html, />取引件数</);
});
