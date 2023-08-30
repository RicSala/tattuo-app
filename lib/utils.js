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

/**
 * Sanitize html tags from a string
 * @param {string} text
 * @returns {string}
 */
export function sanitize(text) {
    return text.replace(/(<([^>]+)>)/gi, "")
}


/** Capitalize first letter of each word in a string
 * @param {string} str
 * @returns {string}
 */
export function capitalizeFirst(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

/**
 * Check if artist profile is complete
 * @param {import("@prisma/client").ArtistProfile} artist
 * @returns {boolean}
 */
export function isProfileComplete(artist) {

    const fieldsToCheck = [
        'artisticName', 'bio', 'cityId', 'images', 'mainImage', 'stylesIds', 'minWorkPrice', 'phone', 'pricePerHour',
        'pricePerSession', 'socials', 'website'
    ];

    for (const field of fieldsToCheck) {
        console.log(field, artist[field])
    }

    return fieldsToCheck.every(field => artist[field]);
}
