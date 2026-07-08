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
2. DNS — registrar is **NearlyFreeSpeech.NET**; the zone currently lives on StableHost's ns1/ns2 (StableHost is DNS + old hosting only). Two panels, either or both:
   - **StableHost cPanel → Zone Editor** (instant cutover, zone TTL ~1h): replace the apex A record (was `213.109.149.41`) with the four GitHub Pages IPs (185.199.108.153 / 109.153 / 110.153 / 111.153); replace the `www` CNAME (was StableHost's Cloudflare CDN) with `tpvfmilk.github.io`.
   - **NFSN member portal** (permanent home — kills the teardown blocker): enable NFSN DNS for the domain (free with registration), add the same records (apex A ×4, `www` CNAME → `tpvfmilk.github.io`, no MX), then switch the domain's nameservers from ns1/ns2.stablehost.com to the NFSN set their UI shows. NS delegation tail can run ~24–48h — seamless as long as both zones hold identical records.
3. After the site is live on the domain **and the NS switch to NFSN has propagated**: cancel StableHost hosting (paid through May 2027) and tear down the old WordPress install — with DNS at NFSN, nothing references StableHost anymore. (Leave MX out of the new zone: @tylerfrancisco.com mail was never set up; the old zone's MX was a cPanel default pointing at the apex.)

## Still to wire

- [ ] LinkedIn + X social links (icons parked in the home/about footers until handles confirmed)
- [x] ~~About photo~~ — **cut by decision** (Tyler 2026-07-06): the home hero cutout is the site's only photo; both about-section portrait slots stay blank. (Masters remain in the vault at `Attachments/self images/` if this ever reverses — the derivative was one `sharp` extract/resize, see git history at `ba79c9a`.)
- [ ] Hero portrait crop: `bottom: -10%` seats the shoulder line below the fold — retune if the portrait art changes (static + mouse-parallax name is the decided treatment; ken-burns/living-still was cut 2026-07-06)
- [ ] First real posts via `publish-post`
