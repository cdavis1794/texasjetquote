// Idempotent source integration. Run explicitly when adding the shared tracker.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const excluded = new Set([".git", ".netlify", "dist", "node_modules", "docs", "test", "netlify", "scripts"]);
const fields = ["source", "medium", "campaign", "content", "landing_page"];
async function integrate(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { await integrate(path); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const before = await readFile(path, "utf8");
    let html = before;
    if (/src="\/assets\/(?:tjq\.|ga4-events|private-trip-brief|austin-quote)/.test(html) && !html.includes('src="/assets/acquisition-context.js"')) {
      html = html.replace(/(<head[^>]*>)/i, '$1\n  <script src="/assets/acquisition-context.js" defer></script>');
    }
    if (html.includes('src="/assets/ga4-events.js"') && !html.includes('src="/assets/tjq.8b31c2.js"')) {
      html = html.replace('<script src="/assets/acquisition-context.js" defer></script>', '<script src="/assets/acquisition-context.js" defer></script>\n  <script src="/assets/tjq.8b31c2.js" defer></script>');
    }
    html = html.replace(/<form\b[^>]*\bname="(?:texas-private-jet-quote|affiliate-click|private-trip-brief)"[^>]*>[\s\S]*?<\/form>/g, (form) => {
      if (form.includes('name="acquisition_source"')) return form;
      const inputs = fields.map(field => `    <input type="hidden" name="acquisition_${field}" value="">`).join("\n");
      return form.replace(/(<input[^>]*\bname="form-name"[^>]*>)/, '$1\n' + inputs);
    });
    html = html.replace(/\r\n/g, "\n");
    if (html !== before) await writeFile(path, html);
  }
}
await integrate(root);
