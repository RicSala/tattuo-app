import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({
    post: {
        title,
        date,
        slug,
        tags,
    }
}) => {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="
            border border-gray-200 dark:border-gray-800
            relative
            max-w-[18rem]
            p-4 rounded-md
            hover:shadow-md
            cursor-pointer
            transition
            duration-200
            ease-in-out
            flex
            flex-col
            gap-3
            overflow-hidden
            isolate
            ">



                <h3>{title}</h3>
                {
                    <p>
                        {format(new Date(date), 'dd/MM/yyyy')}
                    </p>
                }
                {
                    tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {
                                tags.map((tag) => (
                                    <Badge key={tag} tag={tag}>
                                        {tag}
                                    </Badge>
                                ))
                            }
                        </div>
                    )
                }
                <Image src={`/images/slug.jpg`}
                    fill
                    alt=""
                    className="object-cover -z-10
                        opacity-70
                    "
                />
            </div>


        </Link>
    )
};
export default PostCard;