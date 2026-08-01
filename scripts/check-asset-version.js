const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const worker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
const versionMatch = worker.match(/const ASSET_VERSION = "([^"]+)"/);

if (!versionMatch) {
  throw new Error("service-worker.jsの資産版番号が見つかりません。");
}

const assetVersion = versionMatch[1];
const assetNames = ["manifest.json", "style.css", "core.js", "storage.js", "script.js"];

assetNames.forEach(function (assetName) {
  if (!html.includes(`${assetName}?v=${assetVersion}`)) {
    throw new Error(`index.htmlの${assetName}が資産版${assetVersion}と一致していません。`);
  }

  if (!worker.includes(`./${assetName}?v=\${ASSET_VERSION}`)) {
    throw new Error(`service-worker.jsの${assetName}がASSET_VERSIONを参照していません。`);
  }
});

if (!html.includes(`service-worker.js?v=${assetVersion}`)) {
  throw new Error("Service Worker登録URLの資産版が一致していません。");
}

if (!worker.includes('const CACHE_NAME = "used-clothes-sales-v12"')) {
  throw new Error("Service Workerのキャッシュ名がv12ではありません。");
}

process.stdout.write(`資産版${assetVersion}の同期を確認しました。\n`);
