const { test, expect } = require("@playwright/test");

test.beforeEach(async function ({ page }) {
  await page.goto("/index.html#home");
  await page.evaluate(function () {
    localStorage.clear();
  });
  await page.reload();
});

test("画面遷移でタイトルを更新し、見出しへフォーカスする", async function ({ page }) {
  // 利用者が実際に押す、画面下部の可視ナビゲーションから分析画面へ移動します。
  await page.locator('nav a[data-nav-group="analysis"]').click();
  await expect(page).toHaveTitle("分析｜古着売上管理");
  await expect(page.locator("#routeTitle")).toBeFocused();
});

test("登録エラーを入力欄の直下とARIAへ反映する", async function ({ page }) {
  await page.goto("/index.html#register");
  await page.locator("#saleDate").fill("");
  await page.locator("#itemName").fill("");
  await page.locator("#salePrice").fill("0");
  await page.locator("#submitButton").click();

  await expect(page.locator("#saleDateError")).toContainText("販売日を入力してください");
  await expect(page.locator("#saleDate")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#saleDate")).toBeFocused();
});

test("メモを含むAIコピーをキャンセルできる", async function ({ page }) {
  await page.evaluate(function () {
    const month = new Date().toISOString().slice(0, 7);
    const nowText = new Date().toISOString();
    localStorage.setItem("usedClothesSales", JSON.stringify([{
      id: 1,
      saleDate: `${month}-01`,
      purchaseDate: "",
      salesChannel: "メルカリメイン",
      itemName: "確認用商品",
      salePrice: 1000,
      costPrice: 0,
      shippingFee: 0,
      feeRate: 10,
      fee: 100,
      profit: 900,
      profitRate: 90,
      saleDays: null,
      imageData: "",
      memo: "確認用メモ"
    }]));
    // schema v2として起動前に読み込ませ、移行処理の通知や再計算をテストから分離します。
    localStorage.setItem("usedClothesAppMeta", JSON.stringify({
      schemaVersion: 2,
      revision: 1,
      migratedAt: nowText,
      lastBackupAt: "",
      lastDataChangeAt: nowText
    }));
  });

  // localStorage更新後に再読み込みし、アプリ内部のsales配列へテストデータを反映します。
  await page.reload();
  await page.goto("/index.html#analysis/ai");
  await page.locator("#includeAiMemos").check();
  page.once("dialog", function (dialog) {
    dialog.dismiss();
  });
  await page.locator("#copyAiAnalysisButton").click();
  await expect(page.locator("#aiCopyStatus")).toContainText("キャンセルしました");
  await expect(page.locator("#copyAiAnalysisButton")).toBeFocused();
});

test("スマホ幅で横スクロールが発生しない", async function ({ page }) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/index.html#register");
  const overflow = await page.evaluate(function () {
    return document.documentElement.scrollWidth - document.documentElement.clientWidth;
  });
  expect(overflow).toBeLessThanOrEqual(1);
});

test("スマホ幅で文字を200%にしても主要KPIが重ならない", async function ({ page }) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/index.html#home");
  await page.evaluate(function () {
    // iPhoneなどで文字を大きくした状態を再現します。
    document.documentElement.style.fontSize = "200%";
  });

  const layout = await page.evaluate(function () {
    const items = Array.from(document.querySelectorAll(".home-summary-item"));
    const itemRects = items.map(function (item) {
      return item.getBoundingClientRect();
    });
    const strongFits = items.every(function (item) {
      const itemRect = item.getBoundingClientRect();
      const strong = item.querySelector("strong");
      const strongRect = strong.getBoundingClientRect();
      const tolerance = 1;

      return strongRect.left >= itemRect.left - tolerance
        && strongRect.right <= itemRect.right + tolerance
        && strongRect.top >= itemRect.top - tolerance
        && strongRect.bottom <= itemRect.bottom + tolerance
        && strong.scrollWidth <= strong.clientWidth + tolerance;
    });
    const itemsDoNotOverlap = itemRects.every(function (rect, index) {
      return itemRects.slice(index + 1).every(function (otherRect) {
        const horizontalOverlap = Math.min(rect.right, otherRect.right) - Math.max(rect.left, otherRect.left);
        const verticalOverlap = Math.min(rect.bottom, otherRect.bottom) - Math.max(rect.top, otherRect.top);
        return horizontalOverlap <= 0 || verticalOverlap <= 0;
      });
    });

    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      itemCount: items.length,
      itemsDoNotOverlap,
      strongFits
    };
  });

  expect(layout.overflow).toBeLessThanOrEqual(1);
  expect(layout.itemCount).toBe(3);
  expect(layout.itemsDoNotOverlap).toBe(true);
  expect(layout.strongFits).toBe(true);
});

test("破壊操作はバックアップ保存確認をキャンセルすると元データを保持する", async function ({ page }) {
  await page.evaluate(function () {
    const month = new Date().toISOString().slice(0, 7);
    localStorage.setItem("usedClothesSales", JSON.stringify([{
      id: "delete-protection",
      saleDate: `${month}-01`, purchaseDate: "", salesChannel: "メルカリメイン",
      itemName: "残す商品", salePrice: 1000, costPrice: 0, shippingFee: 0,
      feeRate: 10, fee: 100, profit: 900, profitRate: 90, saleDays: null, imageData: "", memo: ""
    }]));
    localStorage.setItem("usedClothesAppMeta", JSON.stringify({ schemaVersion: 2, revision: 1 }));
  });
  await page.goto("/index.html#data/manage");

  let dialogCount = 0;
  page.on("dialog", async function (dialog) {
    dialogCount += 1;
    if (dialogCount < 3) await dialog.accept();
    else await dialog.dismiss();
  });
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#deleteAllDataButton").click();
  await downloadPromise;

  const saved = await page.evaluate(function () {
    return JSON.parse(localStorage.getItem("usedClothesSales"));
  });
  expect(dialogCount).toBe(3);
  expect(saved).toHaveLength(1);
  expect(saved[0].id).toBe("delete-protection");
  await expect(page.locator("#dataManagementStatus")).toContainText("データの変更を中止しました");
});

test("将来バージョンの保存データは読取専用で開き、形式を下げない", async function ({ page }) {
  await page.evaluate(function () {
    const month = new Date().toISOString().slice(0, 7);
    localStorage.setItem("usedClothesSales", JSON.stringify([{
      id: "future-sale",
      saleDate: `${month}-01`, purchaseDate: "", salesChannel: "ヤフー",
      itemName: "将来版商品", salePrice: 9999, costPrice: 2000, shippingFee: 210,
      feeRate: 10, fee: 999, profit: 6790, profitRate: 67.9, futureField: "keep"
    }]));
    localStorage.setItem("usedClothesAppMeta", JSON.stringify({
      schemaVersion: 99, revision: 8, futureMeta: "keep"
    }));
  });
  await page.reload();

  await expect(page.locator("#globalStatus")).toContainText("閲覧と書き出しのみ");
  await page.goto("/index.html#register");
  await expect(page.locator("#submitButton")).toBeDisabled();
  await page.goto("/index.html#data/manage");
  await expect(page.locator("#csvFileInput")).toBeDisabled();
  await expect(page.locator("#jsonBackupInput")).toBeDisabled();
  await expect(page.locator("#deleteAllDataButton")).toBeDisabled();
  const stored = await page.evaluate(function () {
    return {
      meta: JSON.parse(localStorage.getItem("usedClothesAppMeta")),
      sales: JSON.parse(localStorage.getItem("usedClothesSales"))
    };
  });
  expect(stored.meta.schemaVersion).toBe(99);
  expect(stored.meta.futureMeta).toBe("keep");
  expect(stored.sales[0].futureField).toBe("keep");
});

test("起動時の異常な任意数値は隔離し、元文と回復ログを保持する", async function ({ page }) {
  await page.evaluate(function () {
    const month = new Date().toISOString().slice(0, 7);
    const records = [
      {
        id: "valid", saleDate: `${month}-01`, salesChannel: "ラクマ", itemName: "正常商品",
        salePrice: 1000, costPrice: 0, shippingFee: 0, feeRate: 10
      },
      {
        id: "invalid", saleDate: `${month}-02`, purchaseDate: `${month}-03`,
        salesChannel: "ラクマ", itemName: "隔離商品", salePrice: 2000,
        costPrice: -1, shippingFee: -2, feeRate: 101, futureField: "keep"
      }
    ];
    localStorage.setItem("usedClothesSales", JSON.stringify(records));
    localStorage.setItem("usedClothesAppMeta", JSON.stringify({ schemaVersion: 2, revision: 3 }));
  });
  await page.reload();
  await page.goto("/index.html#data/list");

  await expect(page.locator("#salesList")).toContainText("正常商品");
  await expect(page.locator("#salesList")).not.toContainText("隔離商品");
  const result = await page.evaluate(function () {
    return {
      raw: JSON.parse(localStorage.getItem("usedClothesSales")),
      recovery: JSON.parse(localStorage.getItem("usedClothesRecoveryLog"))
    };
  });
  expect(result.raw).toHaveLength(2);
  expect(result.raw[1].futureField).toBe("keep");
  const invalidEntry = result.recovery.entries.find(function (entry) {
    return entry.id === "invalid";
  });
  expect(invalidEntry).toBeTruthy();
  expect(invalidEntry.reasons).toEqual(expect.arrayContaining([
    "仕入れ値が不正です",
    "送料が不正です",
    "販売手数料率が不正です",
    "仕入日が販売日より後です"
  ]));
});
