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

Push to `main` → `.github/workflows/deploy.yml` → GitHub Pages (`build_type: workflow`). Serves at **<https://tylerfrancisco.com>** (custom domain + enforced HTTPS since 2026-07-08); `www` and the old `tpvfmilk.github.io/tylerfrancisco.com/` URL both 301 to the apex.

**Cutover completed 2026-07-08:** custom domain set via Pages API; DNS re-homed — registrar **NearlyFreeSpeech.NET**, zone on NFSN nameservers (`ns.phx5`/`ns.phx7`, apex A ×4 → GitHub Pages IPs, `www` CNAME → `tpvfmilk.github.io`, no MX/CAA); the retiring StableHost zone was updated to matching records for a seamless NS-propagation tail; Let's Encrypt cert issued + `https_enforced` on the same day.

**Remaining teardown (any time after the NS switch has fully propagated, ~24–48h from 2026-07-08):** cancel StableHost hosting (paid through May 2027) and tear down the old WordPress install — DNS lives at NFSN now, so nothing references StableHost. (Keep MX out of the NFSN zone: @tylerfrancisco.com mail was never set up; the old zone's MX was a cPanel default pointing at the apex.)

## Still to wire

- [ ] LinkedIn + X social links (icons parked in the home/about footers until handles confirmed)
- [x] ~~About photo~~ — **cut by decision** (Tyler 2026-07-06): the home hero cutout is the site's only photo; both about-section portrait slots stay blank. (Masters remain in the vault at `Attachments/self images/` if this ever reverses — the derivative was one `sharp` extract/resize, see git history at `73f9c35`.)
- [ ] Hero portrait crop: `bottom: -10%` seats the shoulder line below the fold — retune if the portrait art changes (static + mouse-parallax name is the decided treatment; ken-burns/living-still was cut 2026-07-06)
- [ ] First real posts via `publish-post`
