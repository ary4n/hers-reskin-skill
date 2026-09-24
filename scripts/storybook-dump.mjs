// Usage: node storybook-dump.mjs <storyId> [selector]
// Dumps the computed styles of a rendered Storybook story so tokens and card anatomy
// are measured, not guessed. Needs a Cloudflare Access cookie: run from a Playwright
// context that reused Aryan's Chrome profile, or paste the story HTML into a local file.
// Run from ~/Desktop/Lorikeet/browserbase-scratch (has Playwright installed).
import { chromium } from 'playwright';
const [storyId, selector = 'body *'] = process.argv.slice(2);
if (!storyId) { console.error('storyId required, e.g. components-content-card--default'); process.exit(1); }
const url = `https://marketing-frontend-storybook.eucalyptus.workers.dev/iframe.html?id=${storyId}&viewMode=story`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
const out = await p.evaluate((sel) => {
  const keys = ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','borderRadius','padding','gap','border','boxShadow','width','height'];
  const vars = {}; const cs = getComputedStyle(document.documentElement);
  for (const sheet of document.styleSheets) { try { for (const r of sheet.cssRules) { if (r.style) for (const n of r.style) if (n.startsWith('--b-')) vars[n] = r.style.getPropertyValue(n).trim(); } } catch {} }
  const nodes = [...document.querySelectorAll(sel)].filter(e => e.getBoundingClientRect().width > 0).slice(0, 80);
  return { vars, nodes: nodes.map(e => { const s = getComputedStyle(e); const o = { tag: e.tagName.toLowerCase(), cls: (e.className || '').toString().slice(0, 80), text: (e.textContent || '').trim().slice(0, 40) }; for (const k of keys) o[k] = s[k]; return o; }) };
}, selector);
console.log(JSON.stringify(out, null, 1));
await b.close();
