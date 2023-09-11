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
    return (<>

        <article className="relative overflow-hidden transition rounded-lg shadow hover:shadow-lg md:min-w-[300px]">

            <Link href={`/blog/${slug}`}>
                <Image
                    alt="Office"
                    src={`/images/slug.jpg`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-56"
                />
                <div className="p-4 bg-white sm:p-6">
                    <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                        {date}
                    </time>

                    <h3 className="mt-0.5 text-lg text-gray-900">
                        {title}
                    </h3>

                    <p className="mt-2 text-gray-500 line-clamp-3 text-sm/relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                        dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                        sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                        Molestias explicabo corporis voluptatem?
                    </p>
                    {
                        tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {
                                    tags.map((tag) => (
                                        <Badge key={tag} tag={tag} className="font-normal bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:text-secondary-foreground/70">
                                            {tag}
                                        </Badge>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </Link>

        </article>

        <>

            {/* 

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
                    className="object-cover -z-10 opacity-70 "
                />
            </div>


        </Link> */}
        </>

    </>

    )
};
export default PostCard;