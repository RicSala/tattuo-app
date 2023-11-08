import PostCard from "./post-card";

const PostGrid = (
    { posts }
) => {
    return (
        <div
            className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:gap-10"
        >
            {
                posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))
            }
        </div>

    )
};
export default PostGrid;