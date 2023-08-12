import PostCard from "./post-card";

const PostGrid = (
    { posts }
) => {
    return (
        <div
            className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
        
        
        "
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