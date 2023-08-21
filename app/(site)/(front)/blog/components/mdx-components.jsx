import Link from 'next/link'
import MdxImage from './mdx-image'
import { Heading2 } from '../[slug]/components/blog-headings'

// defines custom components to use in the blog
export const MdxComponents = {
    a: ({ children, ...props }) => {
        return (
            <Link {...props} href={props.href || ''} className='bg-red-700'>
                {children}
            </Link>
        )
    },

    H2: Heading2,

    CustomImage: ({ children, className, src, props }) => {
        // You need to do some work here to get the width and height of the image.
        // See the details below for my solution.

        // eslint-disable-next-line jsx-a11y/alt-text
        return <MdxImage {...props} src={src} className={className} />
    },
    // add a component call 'square' that renders a div with a 1:1 aspect ratio
    Heading: ({ children, props }) => {
        return (
            <h1 {...props} className='text-xl font-bold text-primary'>
                {children}
            </h1>
        )
    }
}