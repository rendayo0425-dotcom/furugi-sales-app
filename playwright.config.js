const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  // テスト生成物は一時領域へ出し、既存の検証結果や権限差の影響を受けないようにします。
  outputDir: "/tmp/used-clothes-sales-playwright-results",
  use: {
    baseURL: "http://127.0.0.1:4177",
    trace: "retain-on-failure"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-webkit", use: { ...devices["iPhone 13"] } }
  ],
  webServer: {
    command: "python3 -m http.server 4177 --bind 127.0.0.1",
    url: "http://127.0.0.1:4177/index.html",
    reuseExistingServer: true
  }
});
