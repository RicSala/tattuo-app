import Image from "next/image";
import Link from "next/link";

export default function BoardCard({
    board
}) {
    return (
        <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md
        min-w-[200px] aspect-square mx-auto
        ">
            <Link href={`/user/boards/${board.id}`} className="">
                <Image
                    src={board.firstTattoo || '/images/placeholder.png'}
                    alt="image" fill
                    className="object-cover rounded-t-lg h-60"
                />
                <div className="absolute p-2 font-bold rounded-md left-2 bottom-2 bg-primary/70 text-primary-foreground">
                    <p>{board.title}</p>
                </div>
            </Link>

        </div>
    );
}