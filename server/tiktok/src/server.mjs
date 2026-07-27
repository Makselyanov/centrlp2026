import { createApp } from "./app.mjs";
import { loadConfig } from "./config.mjs";
import { pathToFileURL } from "node:url";

export async function startServer(env = process.env) {
  const config = loadConfig(env);
  const app = await createApp({ config });
  const server = app.listen(config.port, config.host, () => {
    console.log(
      `[centrlp-tiktok] listening on ${config.host}:${config.port} (${config.environment})`,
    );
  });

  const shutdown = (signal) => {
    console.log(`[centrlp-tiktok] received ${signal}, shutting down`);
    server.close(async (error) => {
      try {
        await app.locals.closeTikTokService?.();
      } catch (closeError) {
        console.error("[centrlp-tiktok] store shutdown failed", {
          name: closeError?.name || "Error",
          code: closeError?.code || "store_shutdown_failure",
        });
        error = error || closeError;
      }
      process.exitCode = error ? 1 : 0;
    });
    setTimeout(() => {
      process.exitCode = 1;
      server.closeAllConnections?.();
    }, 10_000).unref();
  };

  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
  return { app, config, server };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  startServer().catch((error) => {
    console.error("[centrlp-tiktok] startup failed", {
      name: error?.name || "Error",
      code: error?.code || "startup_failure",
    });
    process.exitCode = 1;
  });
}
