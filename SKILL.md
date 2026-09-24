---
name: hers-reskin
description: Reskin a live web page (usually a Juniper page at myjuniper.com) into the Hims & Hers AU design system, pixel-perfect, using only Eucalyptus Storybook components. Use when Aryan or Jess says "reskin", "redesign X in Hers branding", "build this page for Hers AU", shares a myjuniper.com URL, or asks to "learn the Hers/Hims design system". Covers the full loop: learn tokens from Storybook + Figma library, map every section to a Storybook block, build variants in HTML, verify, capture into Figma via MCP, then hand off to Contentful with a flag list.
metadata:
  version: 1.0.0
---

# Hers AU reskin

Turn a live page into a Hers AU page that uses only real design-system blocks, so it captures cleanly into Figma and builds 1:1 in Contentful. Five pages have shipped through this loop (pricing, Hers vs Moshy, program, patient safety, weight treatment); every rule below comes from a defect found on one of them.

## Sources of truth, in priority order

1. **Eucalyptus marketing Storybook** `https://marketing-frontend-storybook.eucalyptus.workers.dev/` (Cloudflare Access, Aryan must be logged into Chrome; use claude-in-chrome, not fetch). Index at `/index.json`. Story render: `iframe.html?id=<id>&viewMode=story`. Props with option lists: `iframe.html?id=<id>&viewMode=story` then `window.__STORYBOOK_PREVIEW__.storyStore.loadStory({storyId})` → `argTypes[k].options`. Storybook renders the **Hims theme**: `accent` = warm off-white, `dark` = black. On the Hers theme those are sage `#ecf1e5` and forest `#13280c`.
2. **Hers Figma library** via the Figma MCP: `get_variable_defs` and `get_design_context` on a library instance in file `9GDQGzBWxeeC2TnwCBXlA3` (the `D_value` frame, node `1:30062`, is built from library components). Use for exact type ramp and colour tokens when Storybook and Figma disagree; Figma wins for visuals, Storybook wins for what Contentful can build.
3. **Mobbin** (`search_screens` "hers") only for layout inspiration, never for measurements.
4. **seed.com** patterns when the brief says "CEO taste": full-bleed photo hero with copy over it, one big-type stat panel, dark forest panel, bento of feature cards, vertical timeline. Keep the Hers surfaces (see Variant C rules).

Tokens, type scale and card anatomy already extracted are in [references/design-tokens.md](references/design-tokens.md). Re-run `scripts/storybook-dump.mjs` only when Storybook changes.

## The loop

### 1. Scrape the source page (Chrome, never curl)
myjuniper.com blocks fetch/WebFetch. In claude-in-chrome: `navigate` → `get_page_text` for copy → one JS call listing `section` elements with heading, height, image count and background colour → screenshots per section (`scrollIntoView` + screenshot, 3 to 5 per batch, big batches time out).

Copy rules: verbatim, Juniper → Hers, "June" → "your AI health companion", "Juniper Lifestyle Survey" → "Hers Lifestyle Survey", keep AU spelling, **no em dashes** (turn " — " into a comma, colon or full stop). Keep every footnote marker and DOI. Keep names of Juniper staff and testimonial handles as placeholders and flag them.

### 2. Section map before any build
Write a table: `# | Juniper section | Hers block(s)`. Every row must name a Storybook component. If nothing fits, write "Flag" and pick the closest block; never invent a component. Known non-existent things: sticky bottom CTA bar, scroll-pinned phone panel, 3-column comparison table (Comparison Table = one competitor; use Simple Table), bespoke illustrations and charts, money-back badge artwork, Trustpilot review card with title line (Testimonial Card is author + stars + quote), video testimonial with side quote (Video Testimonial Card exists in Contentful but does not render; use Open Book with Media video + Typography).

### 3. Build in HTML, locally
- Folder `~/Desktop/Lorikeet/hers-au-pricing/<page>/`, `index.html` linking `../program/base.css` (shared tokens + components). Add page-specific CSS in a `<style>` block, one comment per section naming the Storybook block.
- Serve with `python3 -m http.server 8765` from `hers-au-pricing/` (check `lsof -i :8765` first). Open `http://localhost:8765/<page>/index.html` in Chrome for Aryan.
- Variants: when asked for options, one file, `body[data-variant]` switcher bottom-right, `.only-a/.only-b/.only-c` blocks, same copy in each. Variant C ("Seed x Hers") is the approved house style: Seed skeleton, sage instead of lime fills, white cards with `1px solid rgba(0,0,0,.1)`, green headings `#133f26`, accent words `#768562` (lime `#c3ed79` only on dark panels, ticks, badges).
- Footer: inject `../program/footer.html` at a `<!--FOOTER-->` marker. Nav: copy the header block from `program/index.html`.
- Stand-in images from `hers-au-pricing/img`, `v2/img`, `v2/figma` (Trustpilot logo/stars SVGs live in `v2/figma`). Label anything the design needs but nobody supplied with a yellow `.flag` chip in the page.
- Pixel rules that survive Figma capture: fixed 1440 canvas, 1200 wrap, 120 gutters; borders, never inset box-shadows; Unicode superscripts (¹ ² ³ †), never `<sup>`; `mix-blend-mode` is lost (fix in Figma after); no running animations at capture (marquee `animation: none`); inline SVG for icons; `> img` selectors on hero/closer so nested logos don't inherit `position:absolute; inset:0`.

### 4. Verify before showing
Run `scripts/verify.sh <page>`: screenshots at 1440 and 390 into `<page>/shots/`, counts leftover "Juniper|June", em dashes, `<sup>`, and prints image sizes. Then Read both screenshots and check: section order equals the map, every heading present, no horizontal scroll at 390, rails swipe, accordions open, sliders work.

### 5. Capture into Figma (only after Aryan approves)
1. `scripts/build-capture-page.py <page> [variant]` writes `<page>/capture.html`: single variant, no switcher, flags stripped, `<sup>` converted, animations frozen, capture script tag added, no `data-variant` CSS/JS left (a leftover switcher script once forced variant A and produced an empty frame).
2. `generate_figma_design` with `fileKey 9GDQGzBWxeeC2TnwCBXlA3` (no captureId) → capture ID.
3. `cd ~/Desktop/Lorikeet/browserbase-scratch && node ~/.claude/skills/hers-reskin/scripts/figma-capture.mjs "<url>#figmacapture=...&figmaendpoint=...&figmadelay=3000"` (headless Playwright, 1440×900, waits 25 s). Do not use the Chrome window: its viewport is not 1440.
4. Poll `generate_figma_design` with the captureId until it returns a node URL.
5. `use_figma`: rename the frame `Hers AU <Page> v<n>` (or `(Variant C, Seed x Hers)`), set `blendMode = "MULTIPLY"` on any image that used `mix-blend-mode`, return node ids. If `Main Content` height is 0, `remove()` the frame and re-capture.
6. `get_screenshot` (maxDimension 2400), download with curl, stitch beside `shots/1440.png` with PIL, Read it, confirm 1:1. Report the Figma URL with `node-id`.

### 6. Hand-off
Reply with: Figma link, section table, flag list for Juan (missing blocks, stand-in images, copy needing an AU link or name), and what Contentful build comes next. Contentful conventions and block gotchas are in memory `hers-au-contentful-workflow`; do not repeat them here.

## Don'ts
- No em dashes anywhere, including flags and Figma layer names.
- No components that are not in Storybook, no "helpful" extra copy.
- No pricing outside what the source page shows.
- Never publish in Contentful; marketers cannot, and the singleton nav/footer are per-market entries owned by eng.
