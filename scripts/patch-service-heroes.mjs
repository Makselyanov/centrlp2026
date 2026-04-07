#!/usr/bin/env node
/**
 * One-shot patcher: inserts <ServiceImageBand /> after the first hero
 * </section> in each services/*.tsx that does NOT use ServicePageTemplate.
 * Idempotent: skips files that already import ServiceImageBand.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICES_DIR = path.resolve(__dirname, "..", "src", "pages", "services");

const TEMPLATE_USERS = new Set([
    "AIAgents.tsx",
    "AISystems.tsx",
    "BrowserExtensions.tsx",
    "CustomCRM.tsx",
    "MaxMessenger.tsx",
    "MVPDevelopment.tsx",
    "TelegramMiniApp.tsx",
]);

// PascalCase file name -> kebab-case route slug
function fileToSlug(filename) {
    return filename
        .replace(/\.tsx$/i, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}

function patch(filename) {
    const filePath = path.join(SERVICES_DIR, filename);
    let src = fs.readFileSync(filePath, "utf8");

    if (src.includes("ServiceImageBand")) {
        console.log(`[skip] ${filename} already patched`);
        return;
    }

    const slug = fileToSlug(filename);

    // 1) Insert import after the Layout import (every file imports Layout).
    const importRegex = /(import\s+\{\s*Layout\s*\}\s+from\s+"@\/components\/Layout";\n)/;
    if (importRegex.test(src)) {
        src = src.replace(
            importRegex,
            `$1import { ServiceImageBand } from "@/components/ServiceImageBand";\n`,
        );
    } else {
        console.error(`[fail] ${filename}: no Layout import found`);
        return;
    }

    // 2) Insert <ServiceImageBand /> right after the first </section>
    //    (which closes the hero) — using a single-shot replace.
    let inserted = false;
    src = src.replace(/<\/section>/, (match) => {
        if (inserted) return match;
        inserted = true;
        return `${match}\n\n      <ServiceImageBand slug="${slug}" alt="${slug} — иллюстрация услуги CentrLP" />`;
    });

    if (!inserted) {
        console.error(`[fail] ${filename}: no </section> found`);
        return;
    }

    fs.writeFileSync(filePath, src, "utf8");
    console.log(`[ok]   ${filename} -> slug "${slug}"`);
}

function main() {
    const files = fs
        .readdirSync(SERVICES_DIR)
        .filter((f) => f.endsWith(".tsx") && !TEMPLATE_USERS.has(f));
    for (const f of files) patch(f);
    console.log(`Patched ${files.length} files`);
}

main();
