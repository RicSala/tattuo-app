/** @type {import('next').NextConfig} */
const nextConfig = {

    // output: 'standalone', // https://nextjs.org/docs/app/api-reference/next-config-js/output

    // experimental: {
    //     mdxRs: true,
    // },

    images: {
        remotePatterns:
            [
                {
                    protocol: 'https',
                    hostname: 'images.unsplash.com',
                },
                {
                    protocol: 'https',
                    hostname: 'd1kq2dqeox7x40.cloudfront.net',
                },
                {
                    protocol: 'https',
                    hostname: 'lh3.googleusercontent.com',
                },
                {
                    protocol: 'https',
                    hostname: 'res.cloudinary.com',
                },
                {
                    protocol: 'https',
                    hostname: 'picsum.photos',
                },
                {
                    protocol: 'https',
                    hostname: 'loremflickr.com',
                },
                {
                    protocol: 'https',
                    hostname: 'avatars.githubusercontent.com',
                },
                {
                    protocol: 'https',
                    hostname: 'cloudflare-ipfs.com',
                },



            ]
    },
}
// const withMDX = require('@next/mdx')()
// module.exports = withMDX(nextConfig)
module.exports = nextConfig
