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
