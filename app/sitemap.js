import * as MyTypes from '@/types'


// https://spacejelly.dev/posts/sitemaps-rss-feeds-with-next-js-app-router/
// https://medium.com/@rwchampin/next-js-sitemap-automatically-add-dynamic-urls-to-nextjs-13-app-router-sitemap-js-cc1c38a3668e
// https://maxleiter.com/blog/build-a-blog-with-nextjs-13
// Probably not a bad idea to wait until nextjs has make this more automatic out of the box
// https://www.npmjs.com/package/next-sitemap
// in the meantime... https://www.npmjs.com/package/next-sitemap

import { getPosts } from "@/lib/posts";


export default async function Sitemap() {


  /**
 * @type {MyTypes.BlogPost[]}
 */
  const allPosts = await getPosts()

  const formattedPosts = allPosts.map((item) => ({
    url: `https://tattuo/blog/${item.slug}`,
    lastModified: item.date
  }))


  return [
    {
      url: "https://tattuo.com",
      lastModified: new Date(),
    },
    ...formattedPosts
  ];
}
