import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import PostGrid from "./components/post-grid";
import { getPosts } from "@/lib/posts";

const Page = async ({
    children
}) => {

    const posts = await getPosts();

    return (
        <div>
            <Heading title={"Consejos sobre el mundo del tatuaje"}
                subtitle={"This is my blog page subtitle"}
            />
            <Separator className="my-5" />
            <PostGrid posts={posts} />


        </div>
    )
};
export default Page;