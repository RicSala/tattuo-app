import ShareButtons from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { es } from "date-fns/esm/locale";

export default function PostHeader({ post }) {
  const { tags, slug } = post;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold text-primary">{post.title}</h1>
      <div className="relative h-80 w-full">
        <Image
          src={`/images/${slug}.jpg`}
          alt={`${post.title}`}
          fill
          className="h-[34vw] w-full rounded-xl border border-white object-cover"
        />
        {/* TAGS */}
        {tags && tags.length > 0 && (
          <div className="absolute bottom-2 right-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className={"bg-primary/60 text-xs font-normal"}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs">
            {format(new Date(post.date), "PP", { locale: es })}
          </p>
        </div>
        {/* TODO */}
        {/* <div>
                    <ShareButtons />
                </div> */}
      </div>
    </div>
  );
}
