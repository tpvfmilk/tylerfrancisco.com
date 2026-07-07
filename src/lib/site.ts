import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  title: 'tyler francisco',
  description:
    'Notes on AI, architecture, and building a second brain — field-tested guides on AI in AEC, plus shorter musings.',
  url: 'https://tylerfrancisco.com',
  author: 'Tyler Francisco',
  email: 'tpvfmilk@users.noreply.github.com',
} as const;

export type Post = CollectionEntry<'writing'>;

/** Published posts, newest first. Drafts stay visible in `astro dev`, never in builds. */
export async function getPublishedWriting(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function slugifyTopic(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function readMinutes(body: string | undefined): number {
  const words = (body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: Date, short = false): string {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(short ? {} : { year: 'numeric' }),
    timeZone: 'UTC',
  });
}
