import fs from "node:fs";
import { execFileSync } from "node:child_process";
import ts from "typescript";

function listSourceFiles() {
  return execFileSync("git", ["ls-files", "src/**/*.tsx", "src/**/*.jsx"], {
    encoding: "utf8",
  })
    .split(/\r?\n/)
    .filter(Boolean);
}

function getTagName(node) {
  const tag = node.openingElement?.tagName || node.tagName;
  if (!tag) return "";
  if (ts.isIdentifier(tag)) return tag.text;
  return tag.getText();
}

function hasProp(openingElement, propName) {
  return openingElement.attributes?.properties?.some(
    (prop) => ts.isJsxAttribute(prop) && prop.name.text === propName,
  );
}

function isInteractiveElement(node) {
  if (!ts.isJsxElement(node) && !ts.isJsxSelfClosingElement(node)) return false;

  const tagName = getTagName(node);
  if (["a", "Link", "NavLink", "RouterLink"].includes(tagName)) return true;
  if (tagName.endsWith(".a")) return true;
  if (tagName === "button" || tagName.endsWith(".button")) return true;
  if (tagName === "Button") return !hasProp(node.openingElement || node, "asChild");

  return false;
}

function getLocation(sourceFile, position) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(position);
  return `${line + 1}:${character + 1}`;
}

const violations = [];

for (const filePath of listSourceFiles()) {
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  function walk(node, stack = []) {
    if (ts.isJsxElement(node)) {
      const tagName = getTagName(node);
      const interactive = isInteractiveElement(node);
      const interactiveAncestor = interactive
        ? stack.findLast((item) => item.interactive)
        : null;

      if (interactive && interactiveAncestor) {
        violations.push({
          filePath,
          location: getLocation(sourceFile, node.pos),
          ancestor: interactiveAncestor.tagName,
          child: tagName,
          snippet: source.slice(node.pos, node.end).replace(/\s+/g, " ").trim().slice(0, 180),
        });
      }

      const nextStack = [...stack, { tagName, interactive }];
      node.children.forEach((child) => walk(child, nextStack));
      return;
    }

    ts.forEachChild(node, (child) => walk(child, stack));
  }

  walk(sourceFile);
}

if (violations.length > 0) {
  console.error("Interactive nesting audit failed:");
  for (const violation of violations) {
    console.error(
      `- ${violation.filePath}:${violation.location}: ${violation.ancestor} contains ${violation.child}: ${violation.snippet}`,
    );
  }
  process.exit(1);
}

console.log("Interactive nesting audit passed.");
