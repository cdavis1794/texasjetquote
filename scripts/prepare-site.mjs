import { cp, lstat, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");
const ignored = new Set([
  ".git",
  ".github",
  ".netlify",
  "dist",
  "docs",
  "netlify",
  "node_modules",
  "scripts",
  "test",
  ".env",
  ".node-version",
  ".gitignore",
  "netlify.toml",
  "package.json",
  "pnpm-lock.yaml"
]);

// Remove only this checkout's generated dist directory, never a linked target.
if (resolve(output) !== resolve(root, "dist")) throw new Error("Unexpected build output path");
try {
  if ((await lstat(output)).isSymbolicLink()) throw new Error("Build output must not be a symbolic link");
} catch (error) { if (error.code !== "ENOENT") throw error; }
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (ignored.has(entry.name) || entry.name.startsWith(".env.")) continue;
  await cp(join(root, entry.name), join(output, entry.name), {
    force: true,
    recursive: entry.isDirectory()
  });
}

// Content-address scripts in output only. Existing source filenames remain stable
// for review and tests; old asset copies remain available for cached HTML.
const assets = new Map();
async function fingerprintHtml(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { await fingerprintHtml(path); continue; }
    if (!entry.name.endsWith(".html")) continue;
    let html = await readFile(path, "utf8");
    const scripts = [...html.matchAll(/\bsrc="(\/assets\/([a-zA-Z0-9_.-]+)\.js)"/g)];
    for (const [, original, basename] of scripts) {
      if (!assets.has(original)) {
        const content = await readFile(join(output, original.slice(1)));
        const hash = createHash("sha256").update(content).digest("hex").slice(0, 12);
        const stableBase = basename.replace(/\.[a-f0-9]{8,}$/i, "");
        const versioned = `/assets/${stableBase}.${hash}.js`;
        await writeFile(join(output, versioned.slice(1)), content);
        assets.set(original, versioned);
      }
      html = html.replaceAll(`src="${original}"`, `src="${assets.get(original)}"`);
    }
    await writeFile(path, html);
  }
}
await fingerprintHtml(output);
console.info(`Built static site with ${assets.size} content-addressed scripts.`);
