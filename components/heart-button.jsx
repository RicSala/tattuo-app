'use client'

import useFavorite from "@/hooks/useFavorite";
import { Heart, HeartOff } from "lucide-react";


const HeartButton = ({
    listingId,
    currentUser,
    listingType,

}) => {

    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
        listingType,
    })


    return (
        <div
            onClick={toggleFavorite}
            className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
    "
        >

            <Heart size={30}
                className={
                    hasFavorited ? 'fill-primary' : 'fill-muted/30'
                } />

        </div>
    )
};

export default HeartButton