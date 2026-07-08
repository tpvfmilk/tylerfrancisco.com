# tylerfrancisco.com

Personal site of **Tyler Francisco** — technical designer in Honolulu, writing field-tested guides and musings on AI in AEC, architecture, and second-brain systems.

Astro 5 static site → GitHub Pages. Design system: Arcol-inspired structure on a Claude palette (warm beige chrome, clay-orange accent, pastel abstract thumbnails). The editorial pipeline lives in the private vault (`Second Brain Project → 01 Projects/Website Redo/`); this repo holds only the built site and published content.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321 — drafts visible
npm run build    # production build — drafts excluded
```

## Content model

One collection, `src/content/writing/`, split by frontmatter `type`:

```yaml
---
title: "Post title"
description: "One-line dek shown on cards and in RSS."
type: guide | musing
date: 2026-07-06
updated: 2026-07-20        # optional — shows "Updated" on guides
topics: ["AI in AEC"]      # topic pages are generated from these
draft: true                # dev-only until flipped
featured: true             # optional — pins to the featured slot on /writing/
thumbColor: cyan           # optional — pink|yellow|cyan|lime|violet|coral
thumbPattern: nodes        # optional — nodes|chart|branches|target|frame|pipeline
heroImage: /images/....webp  # optional — real art beats the generated SVG thumb
---
```

Thumbnails are deterministic SVGs from the slug unless overridden — every post gets Arcol-style art with zero manual steps. Posts are written and approved in the vault, then land here via the `publish-post` skill (always behind Tyler's review).

The two posts currently in `src/content/writing/` are **layout samples, `draft: true`** — they render in dev for template work and never build. Replace with real posts via the pipeline.

## Deploy

Live since 2026-07-06: push to `main` → `.github/workflows/deploy.yml` → GitHub Pages (`build_type: workflow`). Current serving URL: <https://tpvfmilk.github.io/tylerfrancisco.com/> — **styles are broken there on purpose** (root-relative assets; the site builds against the custom domain).

**Cutover in progress (started 2026-07-08):**

1. ~~Custom domain on GitHub~~ — **done 2026-07-08** via Pages API (`cname: tylerfrancisco.com`; the `public/CNAME` file matches). Note `https_enforced` resets to false when the domain is added — re-enable after DNS lands and the cert provisions.
2. DNS — in the **StableHost panel** (the zone lives on ns1/ns2.stablehost.com, not at the PDR registrar): replace the apex A record (was `213.109.149.41`) with the four GitHub Pages IPs (185.199.108.153 / 109.153 / 110.153 / 111.153) + replace the `www` CNAME (was StableHost's Cloudflare CDN) with `tpvfmilk.github.io`. Zone TTL ~1h.
3. After the new site is live on the domain: cancel StableHost hosting (paid through May 2027) and tear down the old WordPress install. **⚠ Move DNS off StableHost first** — the nameservers are theirs, so canceling hosting kills the whole DNS zone. Re-home the zone (PDR registrar DNS or Cloudflare) before cancellation. The MX record also points at the apex (cPanel default, no known mailboxes) — drop it at teardown unless @tylerfrancisco.com mail ever gets set up.

## Still to wire

- [ ] LinkedIn + X social links (icons parked in the home/about footers until handles confirmed)
- [x] ~~About photo~~ — **cut by decision** (Tyler 2026-07-06): the home hero cutout is the site's only photo; both about-section portrait slots stay blank. (Masters remain in the vault at `Attachments/self images/` if this ever reverses — the derivative was one `sharp` extract/resize, see git history at `ba79c9a`.)
- [ ] Hero portrait crop: `bottom: -10%` seats the shoulder line below the fold — retune if the portrait art changes (static + mouse-parallax name is the decided treatment; ken-burns/living-still was cut 2026-07-06)
- [ ] First real posts via `publish-post`
