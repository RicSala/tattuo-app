'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ArtistSocials from "./artist-socials";
import { Separator } from "../ui/separator";


const ArtistSmallCard = ({
    artist,

}) => {

    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/tatuadores/profile/${artist.id}`)}
            className="
            cursor-pointer
            hover:bg-muted
            mx-auto flex w-full flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
            <div className="rounded-full relative mb-4 md:mr-6 md:mb-0">

                <Avatar className="cursor-pointer">
                    <AvatarImage src={artist.mainImage || undefined} />
                    <AvatarFallback>{
                        artist.artisticName.split(" ").slice(0, 2).map((name) => name[0]).join("")
                    }</AvatarFallback>
                </Avatar>


            </div>
            <div className="flex-grow">
                <p className="text-xl font-medium text-primary">{artist.artisticName}</p>
                <p className="mb-4 text-sm font-medium text-primary">{
                    // Firts 50 charts of artist.bio, then "..."
                    artist.bio.length > 50 ? artist.bio.substring(0, 50) + "..." : artist.bio
                }</p>
                <Separator className="mb-2" />
                <h2 className="font-bold">Redes sociales</h2>
                <ArtistSocials artist={artist} />
            </div>
        </div>

    )
};
export default ArtistSmallCard;