import axios from "axios";
import { clsx } from "clsx";
// https://www.npmjs.com/package/clsx
// constructing className strings conditionally

import { twMerge } from "tailwind-merge";
// merges tailwind classes without conflicts
// twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
// → 'hover:bg-dark-red p-3 bg-[#B91C1C]'

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Sanitize html tags from a string
 * @param {string} text
 * @returns {string}
 */
export function sanitize(text) {
    let sanitizedText = text.replace(/(<([^>]+)>)/gi, "");
    // Remove the tildes from all vowels
    sanitizedText = sanitizedText.replace(/á/gi, "a");
    sanitizedText = sanitizedText.replace(/é/gi, "e");
    sanitizedText = sanitizedText.replace(/í/gi, "i");
    sanitizedText = sanitizedText.replace(/ó/gi, "o");
    sanitizedText = sanitizedText.replace(/ú/gi, "u");
    return sanitizedText;
}

/** Capitalize first letter of each word in a string
 * @param {string} str
 * @returns {string}
 */
export function capitalizeFirst(str) {
    return str
        .split(" ")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

/**
 * Check if artist profile is complete
 * @param {import("@prisma/client").ArtistProfile} artist
 * @returns {boolean}
 */
export function isProfileComplete(artist) {
    const fieldsToCheck = [
        "artisticName",
        "bio",
        "cityId",
        "images",
        "mainImage",
        "stylesIds",
        "minWorkPrice",
        "phone",
        "pricePerHour",
        "pricePerSession",
        "socials",
        "website",
    ];

    return fieldsToCheck.every((field) => artist[field]);
}

export const range = (start, end, step = 1) => {
    let output = [];

    if (typeof end === "undefined") {
        end = start;
        start = 0;
    }

    for (let i = start; i < end; i += step) {
        output.push(i);
    }

    return output;
};

// given a string, return a slug
export const slugify = (str) => {
    return (
        String(str)
            .normalize("NFKD") // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
            .replace(/\s+/g, "-") // replace spaces with hyphens
            .replace(/-+/g, "-") // remove consecutive hyphens
            // remove the last characters if they are hyphens
            .replace(/-$/, "")
    );
};

export async function uploadImageToCloudinary(
    cloudinary,
    imageUrl,
    folderName,
) {
    try {
        // Fetch the image as a stream
        const response = await axios({
            url: imageUrl,
            method: "GET",
            responseType: "stream",
        });

        return new Promise((resolve, reject) => {
            // Create an upload stream to Cloudinary
            let cloudinaryStream = cloudinary.v2.uploader.upload_stream(
                { folder: `tattuo${folderName ? `/${folderName}` : ""}` }, // Optional: specify a folder in Cloudinary
                (error, result) => {
                    if (result) {
                        resolve(result.secure_url); // Resolve with the URL of the uploaded image
                    } else {
                        reject(error);
                    }
                },
            );

            // Pipe the image data from the response to Cloudinary
            response.data.pipe(cloudinaryStream);
        });
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Given an array, return an array of arrays of the given size
 */
export function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
