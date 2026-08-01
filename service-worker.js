// キャッシュ名を変えると、古いキャッシュを削除して新しいファイルを使いやすくなります。
// HTML/CSS/JSを大きく変更したのに反映されないときは、末尾の番号を1つ増やしてください。
const CACHE_PREFIX = "used-clothes-sales-";
const CACHE_NAME = "used-clothes-sales-v12";
const ASSET_VERSION = "20260801-4";

// オフラインでも最低限アプリ画面を開けるように、基本ファイルだけ保存します。
// 画像やCSVは容量が大きくなりやすいので、ここではキャッシュしません。
const APP_FILES = [
  "./",
  "./index.html",
  `./style.css?v=${ASSET_VERSION}`,
  `./core.js?v=${ASSET_VERSION}`,
  `./storage.js?v=${ASSET_VERSION}`,
  `./script.js?v=${ASSET_VERSION}`,
  `./manifest.json?v=${ASSET_VERSION}`,
  "./icon-192.png",
  "./icon-512.png",
  "./favicon.png"
];

// Service Workerがインストールされたときに、基本ファイルをキャッシュします。
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // SafariのHTTPキャッシュではなく、配信元の最新ファイルを取得します。
      const requests = APP_FILES.map(function (filePath) {
        return new Request(filePath, { cache: "reload" });
      });

      return cache.addAll(requests);
    })
  );

  // 新しいキャッシュ名に変えたとき、できるだけ早く新しいService Workerへ切り替えます。
  self.skipWaiting();
});

// 新しいService Workerが有効になったとき、古いキャッシュを削除します。
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 同じサイトにある別アプリのキャッシュを誤って削除しないよう、このアプリの接頭辞だけを対象にします。
          if (cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }

          return Promise.resolve();
        })
      );
    }).then(function () {
      // すでに開いている画面にも、新しいキャッシュ設定を反映しやすくします。
      return self.clients.claim();
    })
  );
});

// 通信できるときは最新ファイルを取りに行き、失敗したときだけキャッシュを使います。
// これにより、Service Workerが原因で更新が反映されにくくなる問題を減らします。
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }

  // 同じ通信結果を画面表示とキャッシュ更新の両方で使います
  const networkResponse = fetch(new Request(event.request, { cache: "no-store" }));
  const cacheUpdate = networkResponse.then(function (response) {
    if (!response || response.status !== 200 || response.type !== "basic") {
      return undefined;
    }

    return caches.open(CACHE_NAME).then(function (cache) {
      return cache.put(event.request, response.clone());
    });
  }).catch(function () {
    // オフライン時の取得失敗はrespondWith側でキャッシュへ切り替えます
    return undefined;
  });

  // キャッシュ書き込みが終わるまでService Workerを終了させないようにします
  event.waitUntil(cacheUpdate);
  event.respondWith(
    // GitHub Pagesの短期HTTPキャッシュも回避し、通信時は必ず最新版を確認します。
    networkResponse
      .catch(function () {
        return caches.match(event.request).then(function (cachedResponse) {
          if (cachedResponse) {
            return cachedResponse;
          }

          // ページ表示のリクエストだけ、アプリ本体へ戻します。
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return undefined;
        });
      })
  );
});
