const test = require("node:test");
const assert = require("node:assert/strict");
const { probeStorage, commitState, supportsExclusiveLock } = require("../../storage.js");

function createMemoryStorage(initial = {}, failKey = "") {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) {
      if (key === failKey) throw new Error("write failed");
      values.set(key, String(value));
    },
    removeItem(key) { values.delete(key); },
    snapshot() { return Object.fromEntries(values); }
  };
}

test("ストレージの書込み・読込み・削除を確認する", function () {
  assert.equal(probeStorage(createMemoryStorage(), "probe"), true);
});

test("revision不一致では既存データを上書きしない", function () {
  const storage = createMemoryStorage({ sales: "[]", meta: JSON.stringify({ revision: 2 }) });
  const result = commitState({
    storage, salesKey: "sales", metaKey: "meta", expectedRevision: 1,
    allowStaleRevision: false, createNextSales: () => [{ id: 1 }],
    schemaVersion: 2, nowText: "now", markChanged: true
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "conflict");
  assert.equal(storage.getItem("sales"), "[]");
});

test("Web Locks非対応時はrevision検査を省略できない", function () {
  const storage = createMemoryStorage({
    sales: JSON.stringify([{ id: "other-tab" }]),
    meta: JSON.stringify({ revision: 2 })
  });
  const lockManager = undefined;
  const result = commitState({
    storage, salesKey: "sales", metaKey: "meta", expectedRevision: 1,
    allowStaleRevision: supportsExclusiveLock(lockManager),
    createNextSales: function (latestSales) { return [{ id: "new" }, ...latestSales]; },
    schemaVersion: 2, nowText: "now", markChanged: true
  });

  assert.equal(supportsExclusiveLock(lockManager), false);
  assert.equal(result.ok, false);
  assert.equal(result.reason, "conflict");
  assert.deepEqual(JSON.parse(storage.getItem("sales")), [{ id: "other-tab" }]);
});

test("meta保存失敗時は売上も元へ戻す", function () {
  const storage = createMemoryStorage({ sales: "[]", meta: JSON.stringify({ revision: 0 }) }, "meta");
  const result = commitState({
    storage, salesKey: "sales", metaKey: "meta", expectedRevision: 0,
    allowStaleRevision: false, createNextSales: () => [{ id: 1 }],
    schemaVersion: 2, nowText: "now", markChanged: true
  });
  assert.equal(result.ok, false);
  assert.equal(storage.getItem("sales"), "[]");
});

test("v1移行の保存失敗時は商品と旧メタ情報を両方戻す", function () {
  const originalSales = JSON.stringify([{
    id: "legacy",
    salePrice: 9999,
    fee: 1000,
    profit: 6789,
    futureField: "keep"
  }]);
  const originalMeta = JSON.stringify({ schemaVersion: 1, revision: 0 });
  const storage = createMemoryStorage({ sales: originalSales, meta: originalMeta }, "meta");
  const result = commitState({
    storage, salesKey: "sales", metaKey: "meta", expectedRevision: 0,
    allowStaleRevision: false,
    createNextSales: function () {
      return [{
        id: "legacy",
        salePrice: 9999,
        fee: 999,
        profit: 6790,
        futureField: "keep"
      }];
    },
    schemaVersion: 2, nowText: "now", markChanged: false
  });

  assert.equal(result.ok, false);
  assert.equal(result.reason, "write-failed");
  assert.equal(storage.getItem("sales"), originalSales);
  assert.equal(storage.getItem("meta"), originalMeta);
});

test("明示したバックアップ日時と移行日時を既存値より優先する", function () {
  const storage = createMemoryStorage({
    sales: "[]",
    meta: JSON.stringify({
      revision: 3,
      migratedAt: "old-migration",
      lastBackupAt: "old-backup",
      lastDataChangeAt: "old-change"
    })
  });
  const result = commitState({
    storage, salesKey: "sales", metaKey: "meta", expectedRevision: 3,
    allowStaleRevision: false, createNextSales: () => [],
    schemaVersion: 2, nowText: "now", markChanged: false,
    metaPatch: {
      migratedAt: "restored-migration",
      lastBackupAt: "new-backup",
      lastDataChangeAt: "restored-change"
    }
  });

  assert.equal(result.ok, true);
  assert.equal(result.meta.revision, 4);
  assert.equal(result.meta.migratedAt, "restored-migration");
  assert.equal(result.meta.lastBackupAt, "new-backup");
  assert.equal(result.meta.lastDataChangeAt, "restored-change");
});
