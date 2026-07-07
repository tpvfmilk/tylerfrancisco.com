import rss from '@astrojs/rss';
import { SITE, getPublishedWriting } from '../lib/site';

export async function GET(context) {
  const posts = await getPublishedWriting();
  return rss({
    title: `${SITE.title} — writing`,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.id}/`,
      categories: [post.data.type, ...post.data.topics],
    })),
    customData: '<language>en-us</language>',
  });
}
