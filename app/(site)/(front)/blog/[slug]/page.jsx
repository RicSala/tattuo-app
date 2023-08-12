import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import PostBody from "../components/post-body";
import { getPost, getPosts } from "@/lib/posts";


// the posts for which we want to generate static pages
// (we may want to generate other pages on the server...)
export const generateStaticParams = async () => {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }))
}


// generates the metadata for the page (because it's dynamic)
// this can be done with server rendered pages too
// TODO: generate all the medatada + sitemap + other seo things
export const generateMetadata = async ({
    params
}) => {

    const { slug } = params;
    const post = await getPost(slug)


    if (!post) {
        return {
            title: 'Post not found',
        }
    }

    return {
        title: post.title,
    }
};



// the page itself
export default async function PostPage({
    params
}) {

    const post = await getPost(params.slug)

    if (!post) return notFound()

    const { tags } = post;

    return (
        <div>
            {/* TITLE */}
            <h1 className="font-semibold text-3xl text-primary">{post.title}</h1>


            {/* TAGS */}
            {
                tags && tags.length > 0 && (
                    <div className="flex flex-wrap">
                        {
                            tags.map((tag) => (
                                <Badge key={tag}>
                                    {tag}
                                </Badge>
                            ))
                        }
                    </div>
                )
            }

            {/* BODY */}
            <PostBody>
                {post.body}
            </PostBody>
        </div>
    )
};