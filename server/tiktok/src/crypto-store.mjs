import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";
import {
  mkdir,
  open,
  readFile,
  rename,
  rm,
} from "node:fs/promises";
import path from "node:path";

const STORE_VERSION = 1;
const ALGORITHM = "aes-256-gcm";
const AUTH_TAG_BYTES = 16;

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function decode(value) {
  return Buffer.from(value, "base64url");
}

function clone(value) {
  return structuredClone(value);
}

export class EncryptedSessionStore {
  #filePath;
  #key;
  #records = new Map();
  #initialized = false;
  #operation = Promise.resolve();
  #lockHandle = null;
  #lockToken = null;

  constructor({ filePath, masterKey }) {
    if (!Buffer.isBuffer(masterKey) || masterKey.length !== 32) {
      throw new Error("EncryptedSessionStore requires a 32-byte master key");
    }
    this.#filePath = path.resolve(filePath);
    this.#key = Buffer.from(masterKey);
  }

  get filePath() {
    return this.#filePath;
  }

  async init() {
    await this.#enqueue(async () => {
      if (this.#initialized) {
        return;
      }

      await mkdir(path.dirname(this.#filePath), {
        recursive: true,
        mode: 0o700,
      });
      await this.#acquireWriterLock();

      try {
        try {
          const text = await readFile(this.#filePath, "utf8");
          const document = JSON.parse(text);
          if (
            document.version !== STORE_VERSION ||
            typeof document.records !== "object" ||
            document.records === null ||
            Array.isArray(document.records)
          ) {
            throw new Error("Unsupported encrypted session store format");
          }
          this.#records = new Map(Object.entries(document.records));
        } catch (error) {
          if (error?.code !== "ENOENT") {
            throw new Error("Cannot open encrypted TikTok session store", {
              cause: error,
            });
          }
          await this.#persist();
        }

        this.#initialized = true;
      } catch (error) {
        await this.#releaseWriterLock();
        throw error;
      }
    });
  }

  async close() {
    await this.#enqueue(async () => {
      if (!this.#initialized && !this.#lockHandle) {
        return;
      }
      this.#initialized = false;
      this.#records = new Map();
      await this.#releaseWriterLock();
    });
  }

  async get(sessionId) {
    return this.#enqueue(async () => {
      this.#assertReady();
      const sealed = this.#records.get(sessionId);
      if (!sealed) {
        return null;
      }
      return clone(this.#decrypt(sessionId, sealed));
    });
  }

  async set(sessionId, value) {
    return this.#enqueue(async () => {
      this.#assertReady();
      this.#records.set(sessionId, this.#encrypt(sessionId, clone(value)));
      await this.#persist();
    });
  }

  async delete(sessionId) {
    return this.#enqueue(async () => {
      this.#assertReady();
      const deleted = this.#records.delete(sessionId);
      if (deleted) {
        await this.#persist();
      }
      return deleted;
    });
  }

  async rotate(oldSessionId, newSessionId, value) {
    return this.#enqueue(async () => {
      this.#assertReady();
      this.#records.delete(oldSessionId);
      this.#records.set(
        newSessionId,
        this.#encrypt(newSessionId, clone(value)),
      );
      await this.#persist();
    });
  }

  async prune(predicate) {
    return this.#enqueue(async () => {
      this.#assertReady();
      let changed = false;
      for (const [sessionId, sealed] of this.#records) {
        const value = this.#decrypt(sessionId, sealed);
        if (predicate(value, sessionId)) {
          this.#records.delete(sessionId);
          changed = true;
        }
      }
      if (changed) {
        await this.#persist();
      }
    });
  }

  async mutateAll(mutator) {
    return this.#enqueue(async () => {
      this.#assertReady();
      let changed = false;
      for (const [sessionId, sealed] of this.#records) {
        const current = clone(this.#decrypt(sessionId, sealed));
        const next = await mutator(current, sessionId);
        if (next === null) {
          this.#records.delete(sessionId);
          changed = true;
        } else if (next !== undefined) {
          this.#records.set(
            sessionId,
            this.#encrypt(sessionId, clone(next)),
          );
          changed = true;
        }
      }
      if (changed) {
        await this.#persist();
      }
    });
  }

  #assertReady() {
    if (!this.#initialized) {
      throw new Error("EncryptedSessionStore.init() must be called first");
    }
  }

  async #acquireWriterLock() {
    const lockPath = `${this.#filePath}.lock`;
    const lockToken = encode(randomBytes(24));

    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const handle = await open(lockPath, "wx", 0o600);
        await handle.writeFile(
          JSON.stringify({
            pid: process.pid,
            token: lockToken,
            createdAt: new Date().toISOString(),
          }),
          "utf8",
        );
        await handle.sync();
        this.#lockHandle = handle;
        this.#lockToken = lockToken;
        return;
      } catch (error) {
        if (error?.code !== "EEXIST") {
          throw new Error("Cannot acquire TikTok session store lock", {
            cause: error,
          });
        }

        let lock;
        try {
          lock = JSON.parse(await readFile(lockPath, "utf8"));
        } catch (readError) {
          throw new Error(
            "TikTok session store lock exists but cannot be verified",
            { cause: readError },
          );
        }

        const pid = Number(lock?.pid);
        if (!Number.isSafeInteger(pid) || pid <= 0) {
          throw new Error(
            "TikTok session store lock contains an invalid owner",
          );
        }

        let ownerAlive = true;
        try {
          process.kill(pid, 0);
        } catch (processError) {
          if (processError?.code === "ESRCH") {
            ownerAlive = false;
          } else {
            throw new Error(
              "Cannot verify TikTok session store lock owner",
              { cause: processError },
            );
          }
        }

        if (ownerAlive) {
          throw new Error(
            `TikTok session store already has an active writer (pid ${pid})`,
          );
        }
        await rm(lockPath, { force: true });
      }
    }

    throw new Error("Cannot acquire TikTok session store lock");
  }

  async #releaseWriterLock() {
    const lockPath = `${this.#filePath}.lock`;
    const lockToken = this.#lockToken;
    const handle = this.#lockHandle;
    this.#lockHandle = null;
    this.#lockToken = null;

    if (handle) {
      await handle.close().catch(() => {});
    }
    if (!lockToken) {
      return;
    }

    try {
      const lock = JSON.parse(await readFile(lockPath, "utf8"));
      if (lock?.token === lockToken) {
        await rm(lockPath, { force: true });
      }
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw new Error("Cannot release TikTok session store lock", {
          cause: error,
        });
      }
    }
  }

  #encrypt(sessionId, value) {
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGORITHM, this.#key, iv, {
      authTagLength: AUTH_TAG_BYTES,
    });
    cipher.setAAD(Buffer.from(`centrlp-tiktok:${sessionId}`, "utf8"));
    const plaintext = Buffer.from(JSON.stringify(value), "utf8");
    const ciphertext = Buffer.concat([
      cipher.update(plaintext),
      cipher.final(),
    ]);
    return {
      iv: encode(iv),
      tag: encode(cipher.getAuthTag()),
      ciphertext: encode(ciphertext),
    };
  }

  #decrypt(sessionId, sealed) {
    try {
      const iv = decode(sealed.iv);
      const tag = decode(sealed.tag);
      const ciphertext = decode(sealed.ciphertext);
      const decipher = createDecipheriv(ALGORITHM, this.#key, iv, {
        authTagLength: AUTH_TAG_BYTES,
      });
      decipher.setAAD(Buffer.from(`centrlp-tiktok:${sessionId}`, "utf8"));
      decipher.setAuthTag(tag);
      const plaintext = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
      ]);
      return JSON.parse(plaintext.toString("utf8"));
    } catch (error) {
      throw new Error("Encrypted TikTok session store authentication failed", {
        cause: error,
      });
    }
  }

  async #persist() {
    const document = JSON.stringify({
      version: STORE_VERSION,
      records: Object.fromEntries(this.#records),
    });
    const temporaryPath = `${this.#filePath}.${process.pid}.${encode(
      randomBytes(8),
    )}.tmp`;
    let handle;

    try {
      handle = await open(temporaryPath, "wx", 0o600);
      await handle.writeFile(document, "utf8");
      await handle.sync();
      await handle.close();
      handle = null;
      await rename(temporaryPath, this.#filePath);
    } finally {
      if (handle) {
        await handle.close().catch(() => {});
      }
      await rm(temporaryPath, { force: true }).catch(() => {});
    }
  }

  #enqueue(operation) {
    const result = this.#operation.then(operation, operation);
    this.#operation = result.catch(() => {});
    return result;
  }
}
