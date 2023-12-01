import { notFound } from "next/navigation";
import PostBody from "../components/post-body";
import { getPost, getPosts } from "@/lib/posts";
import PostHeader from "./components/post-header";
import Toc from "./components/toc";
import { TestComp } from "@/components/utils/test-comp";
import SessionProvider from "@/providers/session-provider";

// the posts for which we want to generate static pages
// (we may want to generate other pages on the server...)
export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug, // We are generating the params, in this case the slug
  }));
};

// generates the metadata for the page (because it's dynamic)
// this can be done with server rendered pages too
// TODO: generate all the medatada + sitemap + other seo things
export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found", //doesn't seem to be working as it redirects to not-found page
    };
  }

  return {
    title: post.title,
    description: post.body.substring(0, 100), // TODO: Add for seo
  };
};

// the page itself
export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) return notFound();
  //   {/* <Toc headings={post.headings} /> */}
  // TODO: Was not working. Out for now

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-2">
      <SessionProvider>
        <PostHeader post={post} />
        <TestComp />

        {/* BODY */}
        <PostBody>{post.body}</PostBody>
      </SessionProvider>
    </div>
  );
}
