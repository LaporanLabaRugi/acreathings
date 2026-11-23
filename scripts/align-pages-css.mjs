#!/usr/bin/env node
/**
 * The GitHub Pages prerender stamps the stylesheet URL from the SSR build.
 * That hash can differ from the CSS file the client build actually emits, so
 * the published index.html would request a file that is not in assets/.
 * Point the prerendered document at the stylesheet that exists.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

if (process.env.GITHUB_PAGES !== "1") process.exit(0);

const htmlPath = join(process.cwd(), "dist/client/index.html");
if (!existsSync(htmlPath)) process.exit(0);

const assetsDir = join(process.cwd(), "dist/client/assets");
const cssFiles = readdirSync(assetsDir).filter((name) => /^styles-[\w-]+\.css$/.test(name));
if (cssFiles.length !== 1) {
  console.error(`[pages-css] expected one styles-*.css, found ${cssFiles.join(", ") || "none"}`);
  process.exit(1);
}

const cssName = cssFiles[0];
const html = readFileSync(htmlPath, "utf8");
const refs = [...new Set(html.match(/styles-[\w-]+\.css/g) ?? [])];
if (refs.length === 0) {
  console.log("[pages-css] no stylesheet link to align");
  process.exit(0);
}
if (refs.length === 1 && refs[0] === cssName) {
  console.log(`[pages-css] stylesheet link already matches ${cssName}`);
  process.exit(0);
}

writeFileSync(htmlPath, html.replaceAll(/styles-[\w-]+\.css/g, cssName));
console.log(`[pages-css] retargeted ${refs.join(", ")} -> ${cssName}`);
