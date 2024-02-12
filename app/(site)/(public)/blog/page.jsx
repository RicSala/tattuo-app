import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import PostGrid from "./components/post-grid";
import Breadcrumbs from "@/components/breadcrumbs";
import { getPosts } from "@/lib/posts";

export const metadata = {
    title: "Blog de tatuajes",
    description: "Consejos sobre el mundo del tatuaje",
};

export default async function BlogPage({}) {
    const posts = await getPosts();

    const breadcrumbs = [
        {
            label: "Inicio",
            path: "/",
        },
        {
            label: "Blog",
            path: "/blog",
        },
    ];
    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <Heading
                title={"Consejos sobre el mundo del tatuaje"}
                subtitle={
                    "¿No sabes dónde hacerte tu próximo tatuaje? ¿Estás en una nueva ciudad y buscas tatuador de confianza?"
                }
            />
            <Separator className="my-5" />
            <PostGrid posts={posts} />
        </div>
    );
}
