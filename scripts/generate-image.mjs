#!/usr/bin/env node
/**
 * Generate a single image via OpenRouter + Google Gemini 2.5 Flash Image (a.k.a. "Nano Banana").
 *
 * Usage:
 *   node scripts/generate-image.mjs --prompt "..." --out public/images/foo.png [--key ./key.txt]
 *   node scripts/generate-image.mjs --batch scripts/image-batch.json
 *
 * The OpenRouter chat completions endpoint returns generated images in
 * `message.images[]` as base64 data URLs. We decode and save them as PNG.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// ---- arg parsing ----
const args = process.argv.slice(2);
function getArg(name, fallback = null) {
    const idx = args.indexOf(`--${name}`);
    if (idx === -1) return fallback;
    return args[idx + 1] ?? fallback;
}

const KEY_PATH = getArg("key", path.join(ROOT, "key.txt"));
const MODEL = getArg("model", "google/gemini-2.5-flash-image");
const PROMPT = getArg("prompt");
const OUT = getArg("out");
const BATCH = getArg("batch");

if (!fs.existsSync(KEY_PATH)) {
    console.error(`[generate-image] key file not found at ${KEY_PATH}`);
    process.exit(1);
}
const API_KEY = fs.readFileSync(KEY_PATH, "utf8").trim();

async function generateOne(prompt, outPath) {
    const absOut = path.isAbsolute(outPath) ? outPath : path.join(ROOT, outPath);
    fs.mkdirSync(path.dirname(absOut), { recursive: true });

    console.log(`[generate-image] -> ${path.relative(ROOT, absOut)}`);
    console.log(`                  prompt: ${prompt.slice(0, 110)}${prompt.length > 110 ? "…" : ""}`);

    const body = {
        model: MODEL,
        modalities: ["image", "text"],
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    };

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "HTTP-Referer": "https://centrlp.ru",
            "X-Title": "CentrLP image gen",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`OpenRouter ${res.status}: ${text}`);
    }

    const data = await res.json();
    const message = data?.choices?.[0]?.message;
    const images = message?.images || [];

    if (!images.length) {
        // Show what we got back so debugging is easy.
        console.error(`[generate-image] no images in response. Message:`, JSON.stringify(message, null, 2));
        throw new Error("OpenRouter returned no image data");
    }

    const first = images[0];
    const dataUrl = first?.image_url?.url || first?.url || first;
    if (typeof dataUrl !== "string") {
        throw new Error(`Unexpected image format: ${JSON.stringify(first).slice(0, 200)}`);
    }

    // base64 data URL: data:image/png;base64,XXXX
    const match = dataUrl.match(/^data:image\/(png|jpeg|webp);base64,(.+)$/);
    if (!match) {
        throw new Error(`Image is not a base64 data URL (got: ${dataUrl.slice(0, 60)}…)`);
    }
    const ext = match[1] === "jpeg" ? "jpg" : match[1];
    const buffer = Buffer.from(match[2], "base64");

    // Adjust extension if user gave .png but model returned jpg, etc.
    const finalPath = absOut.replace(/\.[a-zA-Z0-9]+$/, `.${ext}`);
    fs.writeFileSync(finalPath, buffer);
    console.log(`                  saved ${(buffer.length / 1024).toFixed(1)} KB`);
    return finalPath;
}

async function main() {
    if (BATCH) {
        const batchPath = path.isAbsolute(BATCH) ? BATCH : path.join(ROOT, BATCH);
        const items = JSON.parse(fs.readFileSync(batchPath, "utf8"));
        for (const item of items) {
            try {
                if (item.skipIfExists) {
                    const abs = path.isAbsolute(item.out) ? item.out : path.join(ROOT, item.out);
                    const baseExists = ["png", "jpg", "jpeg", "webp"].some((e) =>
                        fs.existsSync(abs.replace(/\.[a-zA-Z0-9]+$/, `.${e}`)),
                    );
                    if (baseExists) {
                        console.log(`[generate-image] skip (exists): ${item.out}`);
                        continue;
                    }
                }
                await generateOne(item.prompt, item.out);
                // small delay to be polite
                await new Promise((r) => setTimeout(r, 800));
            } catch (err) {
                console.error(`[generate-image] FAILED for ${item.out}:`, err.message);
            }
        }
        return;
    }

    if (!PROMPT || !OUT) {
        console.error("Usage: node scripts/generate-image.mjs --prompt \"...\" --out path/to/out.png");
        console.error("   or: node scripts/generate-image.mjs --batch scripts/image-batch.json");
        process.exit(2);
    }

    await generateOne(PROMPT, OUT);
}

main().catch((err) => {
    console.error("[generate-image] fatal:", err);
    process.exit(1);
});
