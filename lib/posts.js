// Gets posts data from the file system.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const postsDirectory = path.join(
    process.cwd(),
    "app/(site)/(public)/blog/blogposts",
); // gets the path to the posts folder

//TODO: review what does cache does for us

// const getHeadings = (source) => {
//     const regex = /<H2>(.*?)<\/H2>/g;

//     if (source.match(regex)) {
//         return source.match(regex).map((heading) => {
//             const headingText = heading.replace('<H2>', '').replace('</H2>', '');

//             const link = '#' + headingText.replace(/ /g, '_').toLowerCase();

//             return {
//                 text: headingText,
//                 link,
//             };
//         });
//     }

//     return [];
// };

const getHeadings = (source) => {
    const regex = /<H2 text="(.*?)">/g;

    if (source.match(regex)) {
        return source.match(regex).map((heading) => {
            const match = regex.exec(heading);

            if (match && match[1]) {
                const headingText = match[1];
                const link = "#" + headingText.replace(/ /g, "_").toLowerCase();

                return {
                    text: headingText,
                    link,
                };
            }
        });
        //   .filter(Boolean); // Filter out any undefined entries
    }

    return [];
};

export const getPosts = cache(() => {
    // Get file names under /posts
    const posts = fs.readdirSync(postsDirectory);

    return Promise.all(
        posts
            .filter((file) => path.extname(file) === ".mdx") // get the mdx files only
            .map(async (file) => {
                const filePath = `${postsDirectory}/${file}`; // gets the path to the file
                const postContent = fs.readFileSync(filePath, "utf8"); // gets the content of the file
                const { data, content } = matter(postContent); // gets the metadata and the content of the file

                if (data.published === false) {
                    return null;
                }

                const slug = file.replace(/\.mdx$/, ""); // removes the extension from the file name to create the slug
                const headings = getHeadings(content);

                return {
                    ...data,
                    date: data.date,
                    slug,
                    body: content,
                    headings,
                }; // returns the metadata, slug and content of the file
            }),
    );
});

export async function getPost(slug) {
    const posts = await getPosts();
    return posts.find((post) => post.slug === slug);
}
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

// const postsDirectory = path.join(process.cwd(), 'app/(site)/blog/blogposts');

// export function getSortedPostsData() {
//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDirectory);

//     const allPostsData = fileNames.map(fileName => {

//         // Remove ".md" from file name to get id
//         const id = fileName.replace(/\.md$/, '');

//         // Read markdown file as string
//         const fullPath = path.join(postsDirectory, fileName);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');

//         // Use gray-matter to parse the post metadata section
//         const matterResult = matter(fileContents);

//         if (matterResult.published === false) {
//             return null
//         }

//         // Combine the data with the id
//         return {
//             id,
//             ...matterResult.data
//         }
//     });

//     // Sort posts by date
//     return allPostsData.sort((a, b) => {
//         if (a.date < b.date) {
//             return 1
//         } else {
//             return -1
//         }
//     });
// }

// export const getPostData = async (id) => {

//     const fullPath = path.join(postsDirectory, `${id}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Use remark to convert markdown into HTML string
//     const processedContent = await remark()
//         .use(html)
//         .process(matterResult.content);

//     const contentHtml = processedContent.toString();

//     // Combine the data with the id
//     return {
//         id,
//         contentHtml,
//         ...matterResult.data
//     }
// }
