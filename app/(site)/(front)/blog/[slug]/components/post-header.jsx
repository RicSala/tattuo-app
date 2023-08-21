import ShareButtons from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { es } from 'date-fns/esm/locale'


export default function PostHeader({ post }) {

    const { tags } = post;

    return (
        <div className="flex flex-col gap-2">

            <h1 className="text-3xl font-semibold text-primary">{post.title}</h1>
            <div className="relative w-full">
                <Image src={`/images/empty.png`} alt={`${post.title}`}
                    width={800} height={400}
                    className="w-full h-[34vw] border border-white object-contain rounded-xl"
                />
                {/* TAGS */}
                {
                    tags && tags.length > 0 && (
                        <div className="absolute flex flex-wrap gap-2 bottom-2 right-2">
                            {
                                tags.map((tag) => (
                                    <Badge key={tag} className={"text-xs font-normal bg-primary/60"}>
                                        {tag}
                                    </Badge>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs">
                        {format(new Date(post.date), 'PP', { locale: es })}
                    </p>
                </div>
                <div>
                    <ShareButtons />
                </div>

            </div>
        </div>
    );
}