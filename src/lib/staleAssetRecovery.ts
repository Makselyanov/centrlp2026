const RELOAD_KEY_PREFIX = "centrlp:stale-assets-reload:";

const CHUNK_ERROR_PATTERNS = [
  /ChunkLoadError/i,
  /Loading chunk \d+ failed/i,
  /Failed to fetch dynamically imported module/i,
  /Importing a module script failed/i,
  /error loading dynamically imported module/i,
  /Unable to preload CSS/i,
];

let reloadAttemptedWithoutStorage = false;

function getMessage(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name} ${error.message} ${error.stack || ""}`;
  }

  if (typeof error === "string") {
    return error;
  }

  return String(error);
}

function getClientBuildId(): string {
  if (typeof document === "undefined") {
    return "server";
  }

  const mainScript = document.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/index-"]');
  const src = mainScript?.src || "unknown";
  return src.split("/").pop() || src;
}

export function isStaleAssetError(error: unknown): boolean {
  const message = getMessage(error);
  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

export function recoverFromStaleAssets(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const buildId = getClientBuildId();
  const route = `${window.location.pathname}${window.location.search}`;
  const reloadKey = `${RELOAD_KEY_PREFIX}${buildId}:${route}`;

  try {
    if (window.sessionStorage.getItem(reloadKey)) {
      return false;
    }

    window.sessionStorage.setItem(reloadKey, String(Date.now()));
  } catch {
    if (reloadAttemptedWithoutStorage) {
      return false;
    }

    reloadAttemptedWithoutStorage = true;
  }

  window.setTimeout(() => {
    window.location.reload();
  }, 0);

  return true;
}

export function installStaleAssetRecovery(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    recoverFromStaleAssets();
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (!isStaleAssetError(event.reason)) {
      return;
    }

    if (recoverFromStaleAssets()) {
      event.preventDefault();
    }
  });
}
