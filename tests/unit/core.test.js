const test = require("node:test");
const assert = require("node:assert/strict");
const {
  calculateProfit,
  normalizeAppMeta,
  normalizeSaleRecord,
  partitionRecords,
  mergeQuarantinedRecords
} = require("../../core.js");

test("手数料は1円未満を切り捨て、利益も同じ値から計算する", function () {
  const result = calculateProfit(9999, 2000, 210, 10);
  assert.equal(result.fee, 999);
  assert.equal(result.profit, 6790);
  assert.equal(result.profitRate, 6790 / 9999 * 100);
});

test("旧メタ情報へrevisionとバックアップ項目を後方互換で補う", function () {
  const result = normalizeAppMeta({ schemaVersion: 1, custom: "keep" }, 2, "2026-08-01T00:00:00.000Z");
  assert.equal(result.schemaVersion, 1);
  assert.equal(result.revision, 0);
  assert.equal(result.lastBackupAt, "");
  assert.equal(result.lastDataChangeAt, "");
  assert.equal(result.custom, "keep");
});

test("v1商品をv2へ移行してもID・画像・メモ・未知項目を保持する", function () {
  const source = {
    id: "old-1",
    saleDate: "2026-07-01",
    purchaseDate: "2026-06-01",
    salesChannel: "メルカリメイン",
    itemName: "移行テスト商品",
    salePrice: 9999,
    costPrice: 2000,
    shippingFee: 210,
    feeRate: 10,
    fee: 1000,
    profit: 6789,
    imageData: "data:image/jpeg;base64,abc",
    memo: "残すメモ",
    futureField: { keep: true }
  };
  const result = normalizeSaleRecord(source, "fallback", function () { return 30; });

  assert.equal(result.id, "old-1");
  assert.equal(result.imageData, source.imageData);
  assert.equal(result.memo, "残すメモ");
  assert.deepEqual(result.futureField, { keep: true });
  assert.equal(result.fee, 999);
  assert.equal(result.profit, 6790);
  assert.equal(result.saleDays, 30);
});

test("修復不能行を隔離し、通常保存時に元の内容のまま併合する", function () {
  const brokenRecord = { id: "broken", itemName: "", futureField: { keep: true } };
  const partitioned = partitionRecords(
    [{ id: "valid-1" }, brokenRecord, { id: "valid-2" }],
    function (record) { return record.id === "broken" ? ["商品名が空欄です"] : []; },
    function (record) { return { ...record, normalized: true }; }
  );
  const merged = mergeQuarantinedRecords(
    [{ id: "new" }, ...partitioned.visibleRecords],
    partitioned.quarantinedRecords
  );

  assert.equal(partitioned.visibleRecords.length, 2);
  assert.equal(partitioned.quarantinedRecords.length, 1);
  assert.strictEqual(merged[1], brokenRecord);
  assert.deepEqual(merged[1].futureField, { keep: true });
  assert.equal(merged.filter(function (record) { return record.id === "broken"; }).length, 1);
});
