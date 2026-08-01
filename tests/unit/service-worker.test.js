const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

test("HTMLとService Workerの資産版が一致し、共通処理もオフライン対象になる", function () {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const worker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
  const versionMatch = worker.match(/const ASSET_VERSION = "([^"]+)"/);

  assert.ok(versionMatch, "Service Workerに資産版が必要です");
  const version = versionMatch[1];
  ["manifest.json", "style.css", "core.js", "storage.js", "script.js"].forEach(function (fileName) {
    assert.match(html, new RegExp(`${fileName.replace(".", "\\.")}\\?v=${version}`));
    assert.match(worker, new RegExp(`\\./${fileName.replace(".", "\\.")}\\?v=\\$\\{ASSET_VERSION\\}`));
  });
  assert.match(worker, /used-clothes-sales-v11-stage2/);
});
