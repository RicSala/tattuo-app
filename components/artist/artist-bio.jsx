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
            className="flex flex-col items-center w-full px-4 py-4 mx-auto text-center border cursor-pointer  hover:bg-muted sm:mb-4 rounded-xl md:max-w-lg sm:flex-row sm:text-left">
            <div className="relative mb-4 rounded-full md:mr-6 md:mb-0">

                <Avatar className="cursor-pointer">
                    <AvatarImage src={artist.mainImage || undefined} />
                    <AvatarFallback>{
                        artist.artisticName.split(" ").slice(0, 2).map((name) => name[0]).join("")
                    }</AvatarFallback>
                </Avatar>


            </div>
            <div className="flex flex-col justify-center flex-grow">
                <p className="text-xl font-medium text-primary">{artist.artisticName}</p>
                <p className="text-sm font-medium text-primary">{
                    // Firts 50 charts of artist.bio, then "..."
                    artist.bio.length > 50 ? artist.bio.substring(0, 50) + "..." : artist.bio
                }</p>
            </div>
        </div>

    )
};
export default ArtistSmallCard;