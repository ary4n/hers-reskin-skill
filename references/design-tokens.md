# Hers AU design tokens and block anatomy

Extracted from the Eucalyptus marketing Storybook (computed styles, Sep 2026) and the Hers Figma library. Mirrored in `hers-au-pricing/program/base.css`. Figma file for all captures: `9GDQGzBWxeeC2TnwCBXlA3`, Page 1.

## Type
- Family: **CareSans** (Figtree 400/500/600 as the stand-in when CareSans is not installed). Headings weight 400, labels 500. Never bold headings.
- Display: xl `clamp(48px,7vw,88px)/.98/-0.02em` · l `clamp(44px,6vw,72px)/1/-0.015em` · m `clamp(36px,4.8vw,57px)/1.04/-0.012em` · s `clamp(40px,5.5vw,57px)/1.02`
- Heading: xl `clamp(34px,4.6vw,48px)/1.04` · l `clamp(30px,4vw,40px)/1.06` · m `27.5px/1.15` · s `22px/1.2`
- Body: xl 20 · l 18 · m 16 · s 15 · xs 12.5, line-height 1.35, letter-spacing .022 to .024em
- Label: l 17.5 · m 16 · s 14, weight 500, letter-spacing -0.005em
- Two-tone headline: wrap the accent words in `<span class="hl">` (`#768562`; lime `#c3ed79` on dark). In Contentful the same is `<strong>word</strong>`.

## Colour
- Text: primary `rgba(0,0,0,.81)` · secondary `rgba(0,0,0,.61)` · tertiary `rgba(0,0,0,.45)` · heading green `#133f26` · accent `#768562`
- Surfaces: white · sage `#ecf1e5` (Contentful "accent") · tint `#f2f2f2` · lime `#c3ed79` · forest `#13280c` (Contentful "dark") · dark card `#0f2109` · footer `#f0f0f0`
- Borders: primary `rgba(0,0,0,.19)` · secondary `rgba(0,0,0,.1)` · inverse `rgba(255,255,255,.12)`
- Trustpilot green `#00b67a`, LegitScript blue `#1d4f91` (marks only)

## Shape and spacing
- Radius: section panel 32 · card 24 · content-card image 17.5 · inner 16 · pill 999
- Section padding 96 desktop / 80 tablet / 56 mobile; gutters 120 / 48 / 20; wrap 1200; grid gap 16 (cards) or 24; section stack gap 48
- Buttons: 48 tall pill, 12×24 padding, 14px/500. primary black, white (over imagery), outlined, ghost, glass, lime (on dark panels only)
- Badge: white pill 4×12, 12.5px/500. Lime variant for stats ("▾ 16kg")

## Block anatomy (what the Storybook component actually renders)
- **Content Card**: transparent article, image panel radius 17.5 (portrait 3:4 default, square, landscape 4:3), badges top-left 12/12, title mt-16 20px/500 green, body mt-8 15px secondary, optional price line, CTA, safety link. Image always above title.
- **Feature Card**: solid/tinted/photo tile, heading top-left, subheading, optional corner CTA, image contained or cover. Sizes third/half/full/tall. Only one image slot.
- **Open Book**: two columns, each a stack of blocks. A side holding only Media/Carousel becomes side-filling media. Full-bleed media = No gives the inset rounded panel the Figma uses. Has its own Heading and Disclaimers fields; heading cannot be aligned.
- **Page Section**: eyebrow + heading (align split/left/center, size normal/large/xl) + kicker + up to 2 CTAs + items. Layouts lattice (columns 1 to 4, mobile 1 or 2), rail (items in view 2 to 5, swipe on mobile, no arrows), encompass (content over background image), wikipedia (narrow reading column). Background none/accent/dark/gradient. Rounded corners per side.
- **Comparison Table**: centred heading + kicker, label column, one highlighted "ours" column (label or logo), one competitor column, rows `yes`/`no`/text, footnote + promo chip. A top-level Landing Page block.
- **Simple Table**: rich-text table in a rounded card; use for 3+ columns.
- **Testimonial Card**: author line, stars, centred quote, optional avatar or media. No title line.
- **Trustpilot Rating**: logo + stars, optional href. Sits above hero headlines.
- **Proof Points**: row of check marks / accreditation logos / images, static or scrolling.
- **List Repeater**: one rich text split by headings; layouts iconographic, numeric, accordion, timeline (vertical rail with numbered image cards).
- **Closer**: full-width image, one heading string (no line break), one CTA, anchor centre/top. Last block on the page.
- **Banner**: text, href, variant dark/accent, sticky. Renders at the top regardless of position.
- **Weight Loss Calculator**: heading + citation left, dial card with slider right.
- **Media**: image or video (+poster, label, playback click/hover/autoplay, ratio 16:9/9:16/1:1/4:5, width narrow to full).

## Seed x Hers (Variant C) rules
Keep Seed's structure (full-bleed hero, big stat panel, bento, timeline, one dark panel, 3+2 grid). Swap surfaces: lime fills → sage, grey fills → white with hairline border, display-xl → display-l, headings green, accent words sage-green on light and lime on dark, black primary CTA on light, white CTA over imagery, lime CTA only on dark panels.
