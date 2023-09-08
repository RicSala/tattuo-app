const disallowedUrls = ['/admin', '/profile', '/settings', '/tatuadores/saved', '/tatuajes/boards', '/api', '/auth'
    , '/legal'
]


export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: disallowedUrls,
            },
            {
                // Google AdsBot ignores robots.txt unless explicitly mentioned
                userAgent: 'adsbot-google',
                allow: '/',
                disallow: disallowedUrls,
            },
        ],
        sitemap: 'https://tattuo.com/sitemap.xml',
    }
}