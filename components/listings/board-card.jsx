import Image from "next/image";
import Link from "next/link";

export default function BoardCard({
    board
}) {
    return (
        <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md
        min-w-[200px] aspect-square mx-auto
        ">
            <Link href={`/tatuajes/boards/${board.id}`} className="">
                <Image
                    src={board.firstTattoo || '/images/placeholder.png'}
                    alt="image" fill
                    className="h-60 rounded-t-lg object-cover"
                />
            </Link>

            <div className="absolute left-2 bottom-2 bg-primary/70 rounded-md p-2 font-bold text-primary-foreground">
                <p>{board.title}</p>
            </div>
        </div>
    );
}