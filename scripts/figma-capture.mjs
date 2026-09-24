import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage(); p.on('console', m => { if (/figma|capture/i.test(m.text())) console.log('[page]', m.text().slice(0,200)); });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(25000);
console.log('done'); await b.close();
