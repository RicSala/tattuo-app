import { clsx } from "clsx"
// https://www.npmjs.com/package/clsx
// constructing className strings conditionally

import { twMerge } from "tailwind-merge"
// merges tailwind classes without conflicts
// twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
// → 'hover:bg-dark-red p-3 bg-[#B91C1C]'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}


export function sanitize(text) {
    return text.replace(/(<([^>]+)>)/gi, "")
}