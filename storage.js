(function (global) {
  "use strict";

  function parseJson(text, fallbackValue) {
    if (!text) {
      return { ok: true, value: fallbackValue };
    }

    try {
      return { ok: true, value: JSON.parse(text) };
    } catch (error) {
      return { ok: false, value: fallbackValue, error };
    }
  }

  // Safariのプライベートブラウズなど、localStorageが見えても書けない環境を検出します。
  function probeStorage(storage, probeKey) {
    try {
      const probeValue = `probe-${Date.now()}`;
      storage.setItem(probeKey, probeValue);
      const isReadable = storage.getItem(probeKey) === probeValue;
      storage.removeItem(probeKey);
      return isReadable;
    } catch (error) {
      try {
        storage.removeItem(probeKey);
      } catch (cleanupError) {
        // 確認用キーの削除失敗は、利用不可という結果に含めます。
      }
      return false;
    }
  }

  function restoreValue(storage, key, previousValue) {
    if (previousValue === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, previousValue);
    }
  }

  // 売上とアプリ情報を一組として保存し、途中失敗時は両方を元へ戻します。
  function commitState(options) {
    const {
      storage,
      salesKey,
      metaKey,
      expectedRevision,
      allowStaleRevision,
      createNextSales,
      schemaVersion,
      nowText,
      markChanged,
      metaPatch
    } = options;
    let previousSalesText;
    let previousMetaText;

    try {
      previousSalesText = storage.getItem(salesKey);
      previousMetaText = storage.getItem(metaKey);
    } catch (error) {
      return { ok: false, error, reason: "read-failed", rollbackFailed: false };
    }

    const parsedSales = parseJson(previousSalesText, []);
    const parsedMeta = parseJson(previousMetaText, {});

    if (!parsedSales.ok || !Array.isArray(parsedSales.value) || !parsedMeta.ok) {
      return { ok: false, reason: "invalid-current-data", rollbackFailed: false };
    }

    // 将来版のメタ情報を旧版から保存すると項目を失うため、ストレージ層でも書込みを拒否します。
    if (Number.isInteger(parsedMeta.value.schemaVersion)
      && parsedMeta.value.schemaVersion > schemaVersion) {
      return {
        ok: false,
        reason: "future-schema",
        currentSchemaVersion: parsedMeta.value.schemaVersion,
        rollbackFailed: false
      };
    }

    const currentRevision = Number.isInteger(parsedMeta.value.revision) ? parsedMeta.value.revision : 0;
    if (!allowStaleRevision && currentRevision !== expectedRevision) {
      return { ok: false, reason: "conflict", currentRevision, rollbackFailed: false };
    }

    let nextSales;
    try {
      nextSales = createNextSales(parsedSales.value);
    } catch (error) {
      return { ok: false, error, reason: "prepare-failed", rollbackFailed: false };
    }

    const previousMeta = parsedMeta.value && typeof parsedMeta.value === "object" ? parsedMeta.value : {};
    const safeMetaPatch = metaPatch && typeof metaPatch === "object" ? metaPatch : {};
    const defaultMeta = {
      migratedAt: previousMeta.migratedAt || nowText,
      lastBackupAt: typeof previousMeta.lastBackupAt === "string" ? previousMeta.lastBackupAt : "",
      lastDataChangeAt: markChanged ? nowText : (previousMeta.lastDataChangeAt || "")
    };

    // 明示された復元・バックアップ情報を最後に反映し、既存値で上書きしないようにします。
    const nextMeta = {
      ...previousMeta,
      ...defaultMeta,
      ...safeMetaPatch,
      schemaVersion,
      revision: currentRevision + 1
    };

    try {
      storage.setItem(salesKey, JSON.stringify(nextSales));
      storage.setItem(metaKey, JSON.stringify(nextMeta));
    } catch (error) {
      let rollbackFailed = false;
      try {
        restoreValue(storage, salesKey, previousSalesText);
        restoreValue(storage, metaKey, previousMetaText);
      } catch (rollbackError) {
        rollbackFailed = true;
      }
      return { ok: false, error, reason: "write-failed", rollbackFailed };
    }

    return { ok: true, sales: nextSales, meta: nextMeta };
  }

  async function withExclusiveLock(lockManager, lockName, task) {
    if (supportsExclusiveLock(lockManager)) {
      return lockManager.request(lockName, { mode: "exclusive" }, task);
    }
    return task();
  }

  function supportsExclusiveLock(lockManager) {
    return Boolean(lockManager && typeof lockManager.request === "function");
  }

  const api = { parseJson, probeStorage, commitState, withExclusiveLock, supportsExclusiveLock };
  global.UsedClothesStorage = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
