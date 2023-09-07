import * as MyTypes from '@/types'


// https://spacejelly.dev/posts/sitemaps-rss-feeds-with-next-js-app-router/
// https://medium.com/@rwchampin/next-js-sitemap-automatically-add-dynamic-urls-to-nextjs-13-app-router-sitemap-js-cc1c38a3668e
// https://maxleiter.com/blog/build-a-blog-with-nextjs-13
// Probably not a bad idea to wait until nextjs has make this more automatic out of the box
// https://www.npmjs.com/package/next-sitemap
// in the meantime... https://www.npmjs.com/package/next-sitemap

//TODO: for now, the updated and priority are not shown. Update to latest nextjs to display them (and review rest of the app for breaking changes)

import { getPosts } from "@/lib/posts";
import { formattedUrls, projectUrls } from '@/lib/sitemapUrls';
import { generatedCities } from './(site)/(front)/tatuadores/[cityName]/page';
import { generatedContentSlugs } from './(site)/(front)/tatuajes/[contentSlug]/page';
// import { getFoldersRecursive } from '@/lib/getFoldersRecursive';

/**
 * returns Sitemap
 * @returns {MyTypes.Sitemap[]}
 */
export default async function Sitemap() {


    /**
   * @type {MyTypes.BlogPost[]}
   */
    const allPosts = await getPosts()

    const formattedPosts = allPosts.map((item) => ({
        url: `https://tattuo.com/blog/${item.slug}`,
        lastModified: item.date,
        changeFrequency: 'weekly',
        priority: 0.9,

    }))


    // const nonDynamicRoutes = getFoldersRecursive('/app/(site)/(front)')
    // const FormattedNonDynamicRoutes = nonDynamicRoutes.map((item) => ({
    //     url: `https://tattuo/${item}`,
    //     lastModified: new Date(),
    // }))

    const formattedUrls = projectUrls.map((item) => ({
        url: `https://tattuo.com/${item}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    }))

    const formattedCityUrls = generatedCities.map((item) => ({
        url: `https://tattuo.com/tatuadores/${item}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    const formattedContentUrls = generatedContentSlugs.map((item) => ({
        url: `https://tattuo.com/tatuajes/${item}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    return [
        {
            url: "https://tattuo.com",
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...formattedPosts,
        ...formattedUrls,
        ...formattedCityUrls,
        ...formattedContentUrls
    ];
}



// export default function sitemap() {
//     return [
//         {
//             url: "https://tattuo.com",
//             lastModified: new Date(),
//         },
//     ]
// }