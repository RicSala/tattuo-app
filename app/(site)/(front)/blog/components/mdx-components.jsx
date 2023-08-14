import Link from 'next/link'
import Image from 'next/image'
import MdxImage from './mdx-image'

// defines custom components to use in the blog
export const MdxComponents = {
    a: ({ children, ...props }) => {
        return (
            <Link {...props} href={props.href || ''} className='bg-red-700'>
                {children}
            </Link>
        )
    },
    CustomImage: ({ children, src, props }) => {
        // You need to do some work here to get the width and height of the image.
        // See the details below for my solution.

        // eslint-disable-next-line jsx-a11y/alt-text
        return <MdxImage {...props} src={src} className='hello' />
    },
    // add a component call 'square' that renders a div with a 1:1 aspect ratio
    Heading: ({ children, props }) => {
        return (
            <h2 {...props} className='text-xl font-bold text-primary'>
                {children}
            </h2>
        )
    }
}