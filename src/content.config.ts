import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The `writing` collection — one collection for guides + musings, split on `type`.
// This frontmatter contract is shared with the vault's publish-post skill
// (Second Brain Project → 01 Projects/Website Redo). Keep them in sync.
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['guide', 'musing']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topics: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    // Arcol-style thumbnail: deterministic from the slug unless overridden.
    thumbColor: z.enum(['pink', 'yellow', 'cyan', 'lime', 'violet', 'coral']).optional(),
    thumbPattern: z
      .enum(['nodes', 'chart', 'branches', 'target', 'frame', 'pipeline'])
      .optional(),
    // Real generated hero art (WebP in public/images/) — wins over the SVG thumb when set.
    heroImage: z.string().optional(),
  }),
});

export const collections = { writing };
