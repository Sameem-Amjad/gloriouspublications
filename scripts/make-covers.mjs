/**
 * Renders the demo catalogue's covers and preview pages into public/books/<slug>/:
 * front.jpg, back.jpg (covers) and title.jpg, opening.jpg (sample pages for the
 * page-flip preview). Typographic designs, no third-party artwork.
 *
 *   PLAYWRIGHT_CORE=/path/to/playwright-core CHROME=/path/to/chrome node scripts/make-covers.mjs
 */
import fs from "node:fs";
import { createRequire } from "node:module";

import { BOOKS } from "./catalogue.mjs";

if (!process.env.PLAYWRIGHT_CORE || !process.env.CHROME) {
  console.error("✗ set PLAYWRIGHT_CORE and CHROME");
  process.exit(1);
}
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE);
const OUT = new URL("../public/books/", import.meta.url).pathname;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const base = `body{margin:0;width:600px;height:900px;overflow:hidden;font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif}`;

function front(b) {
  const [dark, light] = b.palette;
  return `<style>${base}
  .c{position:absolute;inset:0;background:${dark};color:${light}}
  .frame{position:absolute;inset:34px;border:2px solid ${light}66;}
  .inner{position:absolute;inset:46px;border:1px solid ${light}40;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px}
  .orn{font-size:30px;letter-spacing:18px;opacity:.75}
  h1{font-size:${b.title.length > 26 ? 50 : 62}px;line-height:1.05;margin:34px 0 26px;font-weight:600;letter-spacing:.5px}
  .rule{width:90px;height:2px;background:${light};opacity:.7}
  .a{margin-top:28px;font-size:26px;letter-spacing:4px;text-transform:uppercase}
  .y{position:absolute;bottom:70px;left:0;right:0;text-align:center;font-size:18px;letter-spacing:6px;opacity:.7}
  </style><div class="c"><div class="frame"></div><div class="inner"><div class="orn">✦ ✦ ✦</div><h1>${esc(b.title)}</h1><div class="rule"></div><div class="a">${esc(b.author)}</div></div><div class="y">${b.year}</div></div>`;
}

function back(b) {
  const [dark, light] = b.palette;
  return `<style>${base}
  .c{position:absolute;inset:0;background:${dark};color:${light};padding:90px 70px;box-sizing:border-box}
  .q{font-size:30px;line-height:1.45;font-style:italic}
  .by{margin-top:36px;font-size:20px;letter-spacing:3px;text-transform:uppercase;opacity:.8}
  .bar{position:absolute;left:70px;right:70px;bottom:80px;display:flex;justify-content:space-between;align-items:flex-end;font-family:Menlo,monospace;font-size:14px;opacity:.75}
  .code{width:150px;height:60px;background:repeating-linear-gradient(90deg,${light} 0 2px,transparent 2px 5px,${light} 5px 6px,transparent 6px 9px)}
  </style><div class="c"><div class="q">${esc(b.description)}</div><div class="by">${esc(b.author)}</div><div class="bar"><span>Public-domain classic · first published ${b.year}</span><div class="code"></div></div></div>`;
}

function titlePage(b) {
  return `<style>${base}
  .p{position:absolute;inset:0;background:#fbf7ef;color:#2b2622;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px}
  h1{font-size:46px;font-weight:600;margin:0 0 18px}.a{font-size:22px;letter-spacing:3px;text-transform:uppercase;color:#6b5f55}
  .o{margin:40px 0;font-size:24px;color:#a08f80;letter-spacing:12px}.y{font-size:18px;color:#6b5f55}
  </style><div class="p"><h1>${esc(b.title)}</h1><div class="a">${esc(b.author)}</div><div class="o">❦</div><div class="y">First published ${b.year}</div></div>`;
}

function opening(b) {
  return `<style>${base}
  .p{position:absolute;inset:0;background:#fbf7ef;color:#2b2622;padding:80px 70px;box-sizing:border-box}
  .ch{text-align:center;font-size:20px;letter-spacing:6px;text-transform:uppercase;color:#8a7b6e;margin-bottom:40px}
  p{font-size:25px;line-height:1.62;text-align:justify;hyphens:auto;margin:0}
  p::first-letter{float:left;font-size:72px;line-height:.9;padding:6px 10px 0 0;color:${b.palette[0]}}
  .n{position:absolute;bottom:50px;left:0;right:0;text-align:center;font-size:16px;color:#8a7b6e}
  </style><div class="p"><div class="ch">Chapter I</div><p lang="en">${esc(b.opening)}</p><div class="n">1</div></div>`;
}

const browser = await chromium.launch({ executablePath: process.env.CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 600, height: 900 } });
for (const b of BOOKS) {
  fs.mkdirSync(OUT + b.slug, { recursive: true });
  for (const [name, html] of [["front", front(b)], ["back", back(b)], ["title", titlePage(b)], ["opening", opening(b)]]) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`);
    await page.screenshot({ path: `${OUT}${b.slug}/${name}.jpg`, type: "jpeg", quality: 86 });
  }
}
await browser.close();
console.log(`✓ ${BOOKS.length} books × 4 images in public/books/`);
