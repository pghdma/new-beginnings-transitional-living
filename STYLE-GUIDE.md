# Build Playbook & Style Guide

## New Beginnings Project Rules

This section is the source of truth for the current New Beginnings site. The broader playbook below documents historical lessons and general practices. If a later section conflicts with these project rules, follow this section.

### Visual System

- Type pairing: headings (`h1`, `h2`, `h3`) use Libre Franklin at `--weight-display` (650) via `--font-display`; body, UI, buttons, eyebrows, and small labels use Source Sans 3 via `--font-body`. Serifs are reserved for the logo. Do not set headings in the body font.
- Logo: the vector lockup and symbol live in `src/assets/brand/` and are inlined by `BrandLockup.astro`, filled with `currentColor`. Set the mark's color with `color`, its size with `--brand-lockup-height` / `--brand-lockup-height-footer`. Never recreate the logo in live text.
- Palette: institutional navy and teal, pale sky, paper, and off white surfaces. Brand ink for the logo is `--brand-ink`.
- Use the shared tokens in `src/styles/global.css` for color, weight, type roles, spacing, controls, header geometry, medallions, focus, and common depth.
- Use `--shadow` for a subtle surface and `--shadow-raised` for a meaningful raised panel. Unique image and interaction shadows may remain scoped when they communicate a deliberate depth level.
- Radii: `--radius-sm` (6px) for controls and chips, `--radius-md` (12px) for cards, contained photos, notes, and tiles, `--radius-lg` (16px) for large composed panels. Heroes, full-bleed bands, section backgrounds, and edge-bleed photos stay square. Circles are reserved for medallions and real portraits.
- Use Lucide icons only. Icons are foreground information aids, never background decoration.
- Prefer licensed home, interior, household detail, and Pittsburgh photography over generic people.
- Never use AI generated photography.

### Type and Copy

- Marketing headings and buttons use Title Case.
- Marketing headings do not end with periods. Questions retain question marks.
- Inline prose links, help text, and legal section headings use sentence case.
- Eyebrows render in uppercase through the shared `.eyebrow` style.
- Do not use em dashes or en dashes in website copy.
- Do not repair casing with `text-transform: capitalize`. Write the correct source text.

### Layout Families

The approved hero families are intentionally different. Do not flatten them into one generic component.

- Home uses a full background image with left aligned copy.
- About uses a shorter full background image with left aligned copy.
- Contact uses a compact centered panorama with the image behind the copy.
- Transparency uses an image backed accountability hero.
- Board uses centered introductory copy with contained supporting media.
- Admissions uses a compact application masthead.
- Support Us uses a donation introduction and giving planner.
- Legal pages use a document masthead with review metadata.
- Recovery overview, housing details, and professional information use editorial split heroes.

The accepted section introduction families are centered stack, balanced split, editorial split, and sticky reference introduction. In a balanced split, do not pair a long heading with one very short sentence. Shorten the heading, strengthen the supporting copy, or choose a different composition.

### Responsive Rules

- The common tiers are 1080px for navigation, 900px for wide editorial layouts, 860px or 820px for content driven layouts, 760px for the primary mobile system, and 480px for compact phones.
- Component specific breakpoints are allowed only when the content requires them.
- Meaningful copy appears before its supporting image in both document and visual order on mobile.
- Do not use CSS order reversal as the normal mobile solution.
- Use one column for feature groups on phones.
- Keep at least 24px page gutters on compact screens.
- Preserve readable line length, visible focus, reduced motion, and WCAG AA contrast.

### Components and Actions

- Use the global button family for primary, outline, light, and light outline actions.
- Use `.inline-link` for links inside prose.
- External links that open a new tab must announce that behavior in their accessible name.
- Use `.icon-medallion` for contained feature and contact icons. Use compact inline icons for simple factual rows.
- Treat all items in one icon group the same way.
- Shared forms use the same control height, radius, border, focus ring, label, help, privacy, and status conventions.
- `CtaBand` is the shared closing pattern for recovery housing and professional pages. Other approved pages keep their contextual endings.

### Privacy and Claims

- Publish only neighborhood level residence information.
- Never publish residence addresses, pins, or identifying exterior photographs.
- Label the administrative office as an office, not a residence.
- Do not invent current rent, amenities, rules, board biographies, donation prices, or outcomes.
- Use a verified portrait only for a real identified leader.

### Release Verification

Before publishing, run `npm run check`, `npm run build`, `npm run predeploy-check`, and `git diff --check`. Render every canonical page at 390px, 866px, and 1440px. Confirm no horizontal overflow, broken images, duplicate IDs, unnamed controls, incorrect heading counts, or em and en dashes.

A portable starting point for building premium, static brochure/marketing sites
on this server (Astro + Cloudflare Pages). Copy this file into a new project and
follow it. It encodes the architecture, the token system, and the design and
workflow rules that took a long time to get right the first time — the goal is
that you never have to relearn them.

The reference implementation is the Step By Step Support site (`~/sbs`). When in
doubt, go read how it's done there.

---

## 0. North star

Build a fast, static, **premium** site that could be mistaken for the work of a
studio that took a long time and charged a lot. It should never read as:

- **templated** (a stock theme),
- **"AI-generated"** (widgets, icon grids, stat bands, gradient blobs), or
- **a "Tailwind demo"** (everything in bordered rounded cards).

Warm, grounded, editorial, human. The site's only job is to build trust and get
the visitor to contact. Every choice serves that.

---

## 1. Tech stack (don't reinvent this)

- **Framework:** Astro, `output: 'static'`. No CMS, no blog engine.
- **Hosting:** Cloudflare Pages (`wrangler pages deploy ./dist`).
- **Styling:** plain CSS. One global stylesheet for tokens/base/reset; everything
  else is component-scoped `<style>` blocks inside `.astro` files. No Tailwind
  (utilities end up fighting the design system).
- **Fonts:** self-hosted via `@fontsource-variable/*`. Never an external font CDN.
- **Icons:** `astro-icon` with the `lucide` set (`<Icon name="lucide:..." />`).
  For brand/social glyphs, inline the solid SVG path.
- **Images:** `astro:assets` (`<Image>`), output AVIF. See §9.
- **Minify:** `astro-compress`, but **with `Image: false`** (it cannot process
  AVIF and will hang the build / zero out files). Let Sharp own images.

### Starter `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    icon({ include: { lucide: ['*'] } }),
    sitemap(),
    compress({
      Image: false, // Sharp already emits optimal AVIF; astro-compress can't read it
      HTML: { 'html-minifier-terser': { ignoreCustomComments: [/^email_off$/, /^\/email_off$/] } },
    }), // must be last
  ],
  build: { format: 'directory', assets: '_astro', inlineStylesheets: 'always' },
  vite: { build: { assetsInlineLimit: 0 } }, // keep scripts external for a strict CSP
});
```

---

## 2. The one rule that makes everything else easy: TOKENS

**Every color, font, spacing value, radius, shadow, and transition is a CSS
variable defined once in `:root`.** Components reference `var(--…)` and never
hardcode a raw value. This is non-negotiable — it's what makes a whole palette
swap, a font-pairing trial, or a contrast tune a *two-to-four-line change*
instead of a hunt through dozens of files.

Group and comment the tokens. Starter block:

```css
@layer base {
  :root {
    /* Fonts */
    --font-display: 'Display Family Variable', Georgia, serif;
    --font-body: 'Body Family Variable', system-ui, sans-serif;

    /* Surfaces (light) */
    --color-bg: #fdfbf6;         /* page background */
    --color-bg-alt: #f1e9da;     /* tinted bands */
    --color-panel: #ffffff;      /* cards */
    --color-dark: #2e352e;       /* dark bands, footer, headings */

    /* Ink (text on light) */
    --color-ink: #403a33;
    --color-ink-soft: #5f5749;
    --color-ink-faint: #6f6249;

    /* Accent — ONE warm anchor color */
    --color-accent: #9a5340;
    --color-accent-strong: #80442f;  /* hover */
    --color-accent-soft: #ecc9b3;    /* on dark */

    /* Lines */
    --color-line: #e6decf;
    --color-line-strong: #d8cbb0;

    /* Text on dark surfaces (a separate ramp) */
    --color-on-dark: #faf6ef;
    --color-on-dark-soft: #d8d2c4;
    --color-on-dark-faint: #b6b2a3;

    /* Form states */
    --color-success: #2f6b41;
    --color-error: #a8362a;

    /* Shape / depth / motion */
    --radius-pill: 999px; --radius-card: 16px; --radius-media: 10px; --radius-sm: 8px;
    --shadow-panel: 0 1px 2px rgba(46,53,46,.05), 0 14px 34px rgba(46,53,46,.1);
    --transition-base: 0.16s ease;

    /* Spacing scale — 4/8-point grid, the ONLY spacing values allowed */
    --space-3xs: 0.25rem; --space-2xs: 0.5rem; --space-xs: 0.75rem;
    --space-sm: 1rem; --space-md: 1.5rem; --space-lg: 2rem;
    --space-xl: 3rem; --space-2xl: 4rem; --space-3xl: 6rem;
  }
}
```

Negative spacing uses `calc(var(--space-x) * -1)` — you can't negate a `var()`
with a leading minus.

---

## 3. Color rules

- **One** warm anchor accent. Solid accent = primary action; everything else is
  restrained. Don't introduce secondary bright colors.
- Keep a **separate text ramp for dark surfaces** (`--color-on-dark*`). Ink
  colors meant for cream will look muddy on forest.
- **Get contrast from the light side.** When a site feels "too soft," the fix is
  usually to *brighten the light surfaces* (lighter bg, white cards) — not to
  darken the tinted bands. Three tiers reads well: white cards > cream content >
  tinted bands.
- Aim for a real palette, not 40 near-duplicate hexes. If you find yourself
  eyeballing `#5f5749` vs `#574f3f`, consolidate to the token.

---

## 4. Typography

- Pair a **characterful display** face with **one clean body** face — OR use a
  single versatile sans for both (differentiated by weight/size). Avoid the
  overused defaults (Inter everywhere reads generic; the "wonky warm serif" is
  now an AI tell).
- Set responsive type with `clamp(MIN, VW, MAX)`. **The MIN is the mobile size** —
  keep it modest. Oversized clamp minimums are the #1 cause of "everything feels
  smashed / too full" on phones. Loosen tight heading line-heights (`1.0–1.05`)
  toward `1.08–1.15` so wrapped mobile headings breathe.
- **Metric-matched `@font-face` fallbacks** (system font + `size-adjust`) to kill
  font-swap layout shift.
- **Preload** the above-the-fold font `.woff2`.
- Mobile base body ~16px; desktop ~17px. Line-height a touch looser on mobile
  (`~1.72`).

---

## 5. Spacing & rhythm

- **8-point scale only** (§2 tokens). Arbitrary values are what make a layout
  read as "chaotic/cluttered" even when nothing is obviously wrong.
- **Proximity:** space *inside* a group must be clearly smaller than the space
  *between* groups. That's what makes sections read as distinct instead of a wall.
- One padding scale and one text measure (~66ch) per page. Let sections breathe.

---

## 6. Layout

- Max content width ~1200px. Comfortable measure (~66ch) for body copy.
- **Asymmetric, editorial grids.** Do not stack-and-center everything. Break the
  grid deliberately once per page for interest.
- Anchor short title columns with a small clay rule; use ruled lists over pill
  clouds (tag lists are the exception — those get pills).
- Long/reference pages (legal, docs): **sticky table-of-contents** on the left
  that scroll-spies the active section. See `~/sbs/src/layouts/LegalLayout.astro`.

---

## 7. Component patterns — what to do, and what reads as cheap

**Do:**

- **Asides / callouts = typographic, not boxed.** A rule top-and-bottom
  (`border-block`) + a small-caps label in the margin. NOT a bordered rounded
  card with a tinted fill. (Boxed callouts are the "Tailwind demo" tell.)
- **Buttons:** solid accent = primary, outline = secondary. Never a naked "or
  call 555-…" text link sitting beside a button. **One call-to-action prompt per
  column.**
- **Icons** live in soft clay/peach circles. **Social** icons are solid brand
  glyphs inside solid accent circles.
- **Active/selected states** = a color change or a left rule + weight, not a
  filled pill or highlighted box.
- **Logo strips** grayscale, small-caps section label at `0.14em` tracking.
- **Real photography.** Mark placeholders clearly where a shoot is pending. Never
  fake a real person with a stock model.

**Don't:**

- Bordered rounded cards for every aside; Bootstrap-style alert/dialog boxes.
- Widget clusters, icon grids, big-number stat bands, gradient blobs, watercolor
  washes, carousel heroes, squishy drop shadows.
- Center-everything layouts; rounded pastel sans in teal-and-lavender.
- Stock photos of cupped hands, sunsets, lighthouses, footprints, rainy windows.

---

## 8. Copy voice

- Plainspoken, warm, direct, adult. First person from the owner where it fits.
- **No em dashes.** Ever. (Use commas, periods, or "and".)
- Lead with the reader's real barrier (for behavioral health: shame/fear —
  "you don't have to hit a crisis point," "we meet you where you are").
- Don't overuse the person's name; use it only where it's genuinely biographical.
- Active voice, plain verbs, sentence case. A control says what it does ("Send
  message", not "Submit"), and keeps that name through the whole flow.
- Errors and empty states give direction, not mood. Never vague, never apologetic.
- Reuse the client's own real wording lightly edited over inventing polished copy
  that reads as filler.

---

## 9. Performance (this is how you get 95+ on mobile PageSpeed)

- **All images AVIF** through `astro:assets`:
  ```astro
  <Image src={photo} alt="…" format="avif" quality={45}
         widths={[640, 1280]} sizes="100vw" loading="lazy" decoding="async" />
  ```
  Use `quality` ~34–45 for photographs, ~55 for detail images, and **~68 for line
  art** (plans, drawings, diagrams) — AVIF at low bitrate smears thin dark strokes
  on white and makes a crisp drawing look grainy. `<Picture>` (avif+webp) only if
  you truly need a webp fallback — it triples encode time.
- **Size the srcset to the real need.** With `sizes="100vw"`, a 1440px screen at
  DPR 2 wants ~2880px of pixels; a srcset topping out at 1600w will upscale and
  look soft no matter how sharp the source. Check the largest width you actually
  serve before blaming the image.
- **Disable astro-compress images** (`Image: false`, §1).
- **Preload the LCP image** (usually the hero) — compute its srcset with
  `getImage()` and emit `<link rel="preload" as="image" imagesrcset=… fetchpriority="high">`
  in `<head>` via a layout `<slot name="head" />`.
- **Lazy-load third-party scripts** (Turnstile, chat widgets) on first form
  interaction (`focusin`/`pointerdown`), not on page load. Keeps them off the
  initial critical path entirely.
- **Preconnect** any third-party origin you can't avoid.
- **Right-size raster logos.** A 2402px PNG shown at 120px is a real PageSpeed
  flag — run logos through the image pipeline or downscale the source.
- **Cloudflare Web Analytics** injects a `beacon.min.js` automatically and costs
  main-thread time. If you don't need it, turn it off in the Cloudflare dashboard
  (it's not in your code).
- Fonts self-hosted + preloaded; no external CDNs = no extra connections.
- **Swapping a body font? Compute the fallback metrics, don't guess.** A
  metric-matched `@font-face` fallback (`size-adjust`, `ascent-override`,
  `descent-override`) is what keeps CLS at 0 through the font swap. Derive them
  from the shipped woff2 with fontTools rather than eyeballing:
  ```python
  f=TTFont('x.woff2'); upm=f['head'].unitsPerEm; avg=f['OS/2'].xAvgCharWidth
  size_adjust = (avg/upm) / (1114/2048)      # vs Arial
  ascent  = f['hhea'].ascender/upm/size_adjust
  descent = abs(f['hhea'].descender)/upm/size_adjust
  ```
- **Fonts have opinions about your copy.** Barlow kerns `)(` into what reads as a
  single `X` glyph, so `501(c)(3)` came out as `501lcX3)` at small sizes — a real
  bug that survived three "fixes" (size, colour, letter-spacing) because the *face*
  was the cause. If a specific string looks broken, render it in a few candidate
  faces at the real size before touching CSS.

---

## 10. Accessibility (target WCAG 2.1 AA, Lighthouse a11y 100)

Semantic HTML and landmarks, descriptive alt text (decorative images `alt=""`),
full keyboard operability with a **visible focus outline** and a "skip to main
content" link, sufficient color contrast (never color alone), labeled form fields
with inline status/error messages, and `prefers-reduced-motion` respected.

**Lighthouse cannot see through a photograph.** Text over an image scores a clean
`color-contrast: 1` even when it's genuinely unreadable — a hero deck of ours
measured **3.06:1** (body text needs 4.5) while Lighthouse reported 100. For any
text over a photo, **sample the rendered pixels behind the glyphs** and compute
the ratio yourself (take the ~80th-percentile luminance of the band behind the
text, that's the background showing between letters). If it fails, add a scrim
weighted along the reading direction — and **re-measure after moving the copy**,
because a scrim tuned for bottom-anchored text does nothing for centred text.

**An `<a>` with no `href` is not a link.** For placeholder social icons or a
disabled CTA, use a `<span>` (or an anchor with the href omitted) — `href="#"` is
a broken control and fails the `link-name` audit.
Health-adjacent sites attract ADA complaints — this is cheap insurance. Ship an
Accessibility Statement page and actually meet it.

---

## 11. Mobile

- Test 320–768px. Put **`overflow-x: clip`** on the page wrapper as a safety net
  against any stray horizontal scroll (safe with a sticky header; `overflow:
  hidden` is not).
- **Test at 430px, not just 390px.** A `max-width` cap that happens to equal the
  container width at 390 looks perfect there and shows a dead gutter on a Pro Max.
  We shipped a "fixed" full-width image that was still capped, and the 390px test
  passed it. Add 430 to the sweep.
- **An overflow sweep proves nothing is sticking *out*; it cannot tell you what's
  *in* looks right.** Two real bugs (a width cap, a shattered bullet list) passed
  every automated check. Real-device screenshots are the complement, not a luxury.
- Watch clamp minimums (§4) and line-height (§5).
- **`min-height: 100dvh` + flex sticky-footer is a trap** on iOS Safari — it lets
  the browser open a phantom gap below the footer. If the footer is always taller
  than the viewport, you don't need it; drop it. Plain block flow is safer.
- Desktop Chromium **cannot** reproduce iOS Safari rendering (rubber-band
  overscroll, dvh quirks). Don't burn cycles debugging an iOS-only bug in a
  desktop engine — get a screenshot from the device or apply the known fix.

---

## 12. Legal pages (for any real business, doubly for healthcare)

Ship **Privacy Policy, Terms of Service, Accessibility Statement**, and for a
healthcare/self-pay practice a **Good Faith Estimate (No Surprises Act)** notice.
Use the sticky-TOC layout. Write them thorough and in plain language. For a
therapy/health practice, be explicit about the difference between *website data*
and *protected health records*, warn people not to send PHI through the form, and
put the crisis line (988/911) in a prominent aside on the terms page.

**AI-drafted legal text is a strong starting point, not a substitute for a
lawyer.** Always recommend the client have an attorney review before launch.

---

## 13. Deploy & workflow

- **Reuse existing credentials.** There is a Cloudflare API token and SSH/GitHub
  auth already on this server — use them. Never mint new tokens.
- Per change: **build → deploy → commit → push, same turn, without asking.**
  ```
  npx astro build
  CLOUDFLARE_API_TOKEN=$(cat ~/.cloudflare-token) CLOUDFLARE_ACCOUNT_ID=<id> \
    npx wrangler pages deploy ./dist --project-name=<project> --branch=main --commit-dirty=true
  git add -A && git commit -m "…" && git push
  ```
- Name the Pages project consistently; wire the custom domain in the Pages
  dashboard (Cloudflare auto-creates the DNS since the zone is already there).
- **Cloudflare serves HTML dynamically but browsers cache hard.** When checking a
  change on your phone, cache-bust with `?v=N` or you'll swear nothing changed.
- Contact form on a static site: a Cloudflare Worker that POSTs to an email API,
  plus a honeypot + Turnstile. Post to the full `workers.dev` URL, not a relative
  `/api/*` path.

---

## 14. Verification

- Use headless Chromium (CDP over a websocket is enough; you don't need Playwright)
  for layout screenshots, computed-style extraction, and an overflow sweep
  (`scrollWidth - clientWidth` across **320, 360, 390, 414, 430, 560, 768**).
- **Assert on measurements, not screenshots, wherever you can.** Screenshots lie by
  omission — lazy images look "broken", a 37px misalignment looks fine. Drive the
  real page and check numbers: column heights equal, gap == 24px, four segs
  visible, icon row on one line, custom amount clears the preset.
- **Re-run the check against the deployment URL after deploying** (see
  INFRASTRUCTURE §7) — an apex check right after a deploy can silently verify the
  *old* page. Twice we "confirmed" a fix that hadn't shipped.
- **When your own test fails, suspect the test first.** Closed `<details>` content
  still has a bounding box in current Chrome (use `checkVisibility()`), and a
  scripted `.focus()` won't fire the `focusin` a lazy loader listens for.
- **`display: grid` on a list item explodes mixed content.** Grid promotes *every*
  child into its own cell, so `<li><strong>X</strong> text <a>link</a>.</li>`
  scatters across columns. Bullets with a single text run survive it, which is why
  it can hide for weeks. Use normal flow + an absolutely-positioned marker.
- **Equal specificity means source order wins.** A `@media` override placed *above*
  the base rule it's meant to beat does nothing. Put overrides after.
- For big refactors (a token migration, a spacing snap), do a **before/after
  screenshot diff** to prove you changed only what you intended.
- Remember §11: the desktop engine can't see iOS-only bugs.

---

## 15. How to work (expectations for whoever/whatever builds this)

- **Be economical.** Full builds and headless-browser screenshots cost real
  usage. One build, one deploy per change. Don't screenshot-loop; trust the code
  and the diff. Only capture visuals when a human needs to judge something visual.
- **Don't guess-deploy.** If you can't reproduce a bug (especially mobile/iOS),
  get a screenshot or apply the known nuclear fix — don't ship five speculative
  changes in a row.
- **Research before designing, and derive from the site's own vocabulary.** Don't
  import a pattern from a component library or a generic "premium" blog. Pull the
  solution from what the site already uses (its accent, its type, its existing
  devices). Importing outside patterns is what produces the templated look.
- **Own mistakes plainly.** State what broke, why, and the fix. No hedging.
- Spend boldness in one place (one signature element); keep everything around it
  quiet and disciplined.

---

## 16. Building from a reference site (or migrating one)

Most of these builds start from an existing site — a design the client admires, or
their own site being lifted off a platform. Both cases reward the same discipline.

**Measure it, don't eyeball it.** Fetch the real stylesheet and read the real
values. Webflow sites hand you everything: one shared CSS file, and the computed
styles are one CDP call away. "It looks like about 40px" produces a caricature;
`padding: .625rem 1.5rem .75rem` produces the thing.

- Open the page in headless Chromium and pull computed styles for the element you
  care about, or `curl` the stylesheet and grep the class.
- **Measure the right element.** Twice I measured a wrapper (`<header>`, which also
  contained the navbar) and concluded the hero was square and full-bleed when the
  actual card inside it had a 24px radius and a 24px inset. If a value looks
  surprising (radius 0, full width), you're probably on the wrong node.
- Their tokens usually map cleanly onto yours (`--color--hr-dark: #3333331f` is
  just black at 12%). Translate, don't transplant.

**If the design isn't the client's, the words and the assets must be yours.**
Copyright protects *expression* — code, text, images, vectors — not layout,
structure, or "look and feel." So:

- Rewrite every borrowed string. Then **prove it**: extract the visible text of
  their whole site and yours, and diff for shared 5-word runs. Anything left should
  be unavoidable boilerplate ("501(c)(3) tax-exempt organization"). Ours came back
  with three real matches after we thought we were clean.
- **Never paste path data from their SVGs.** Redraw it. A twelve-pixel checkmark is
  not worth being the one literal copy on the site.
- Their licensed fonts (Typekit, etc.) are theirs. Pick your own.
- Note in a comment where a device came from, but the implementation is written
  from scratch.

**Migration-specific:** when it's the client's own site coming off Squarespace/Wix,
the content *is* theirs and the copyright question is moot — but keep the measuring
discipline, and treat the old site as a spec, not a design brief. Half the reason
they're leaving is that the old thing was mediocre.

---

## 17. Nonprofit sites: Google Ad Grants

Any 501(c)(3) client will want the Ad Grants program ($10k/month in Search ads).
Approval includes a **website review**, and it's cheap to pass if you build for it
from day one. [Website policy](https://support.google.com/nonprofits/answer/1657899),
[eligibility](https://support.google.com/nonprofits/answer/3215869).

Requirements that shape the build:

- **Mission stated prominently** — homepage and/or a dedicated About page, in
  Google's words: "clearly state your nonprofit's mission and describe its
  activities or services."
- **Programs described clearly** — "clearly describe your main programs, services,
  and impact." Name them explicitly; don't make a reviewer infer them.
- **Substantial original content** — they explicitly flag "very little text
  content." **Every indexable page needs ~300+ words.** Thin project/portfolio
  pages are the usual failure: ours started at 18–155 words each and had to be
  expanded to 300+.
- **Publish the EIN** (or an annual report). One line in the footer. This is the
  item everyone forgets.
- **No under-construction pages, and a working donation flow.** A visibly disabled
  donate button reads as unfinished — either wire the payment provider or present
  offline giving as a deliberate, finished panel.
- **HTTPS, no broken links, no AdSense/affiliate.**
- **Commercial activity** (a shop, or selling homes at cost) is allowed if it's
  mission-related and *not the primary focus* — but say plainly how the sales fund
  the mission.
- Ineligible org types: **hospitals/healthcare, schools/universities, government.**
  Housing, arts, social services etc. are all fine.

Post-approval, the account needs a 5% CTR and ≥1 tracked conversion/month — so wire
conversion events on the contact form when you build it, not later.

---

## 18. Content accuracy (non-negotiable)

If the client hands you source documents (a grant narrative, a filing, bios), **the
site may only say what those documents say.**

- Every number on the page must trace to a sentence in a source doc. Keep the
  receipts; the client *will* ask "where did this come from?"
- **Never invent social proof.** I once wrote "buyers consistently tell us it was
  worth it" for an organization that had not yet sold a house. That is the same
  species of error as inventing attribution, and it is the one that gets a client
  called a liar.
- Watch for tense drift: a doc that says the founder "plans to" support the org
  becomes "continues to" on the site. Flag those, don't smooth them.
- Watch for **100%-style claims** ("every dollar goes into houses") — a charity's
  own filing usually allocates something to admin, and that claim is the classic
  watchdog tripwire.
- Audit before launch: read every rendered page against the source docs, and list
  what you changed. Ours turned up eight overclaims after we thought the copy was
  finished.

---

## 19. Headline style: pick one and enforce it by script

Three conventions will coexist in a build without anyone noticing (Title Case,
sentence case, some with periods, some without). Pick one — we landed on **Title
Case, no terminal period**, with full-sentence "statement" headlines exempt (Title-
Casing a real sentence reads as an error).

Then **verify it mechanically**: extract every rendered `h1`/`h2` from every page
and assert the rule, with the statement headlines as an explicit exemption list.
73 headlines, one script, no drift.

---

*Reference implementations: `~/sbs` (healthcare) and `~/hgahf` (nonprofit — see it
for the reference-site workflow in §16, the Ad Grants checklist in §17, and the
`predeploy-check` guard). Palette/fonts/spacing live in `src/styles/global.css
:root`. Legal + sticky-TOC in `src/layouts/LegalLayout.astro`. Deploy creds and
conventions per §13 and `~/INFRASTRUCTURE.md`.*
