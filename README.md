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

## Deploy (one-time setup)

1. Create the public GitHub repo (e.g. `tpvfmilk/tylerfrancisco.com`) and push `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**. Every push to `main` then deploys via `.github/workflows/deploy.yml`.
3. Custom domain: **Settings → Pages → Custom domain → `tylerfrancisco.com`** (the `public/CNAME` file matches). At the registrar (currently PDR via StableHost), point A records to GitHub Pages IPs (185.199.108–111.153) + `www` CNAME to `tpvfmilk.github.io`. Until DNS cuts over, the `*.github.io` URL will show broken styles — expected, since the site builds against the custom domain.
4. After the new site is live on the domain: cancel StableHost hosting (paid through May 2027) and tear down the old WordPress install.

## Still to wire

- [ ] LinkedIn + X social links (icons parked in the home/about footers until handles confirmed)
- [ ] About-photo derivative (masters live in the vault: `Attachments/self images/`) — replaces the placeholder slot on `/` and `/about/`
- [ ] Hero "living still" video treatment (Higgsfield image-to-video pass on the portrait) — CSS ken-burns stands in today
- [ ] First real posts via `publish-post`
