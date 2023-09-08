'use client'

import useFavorite from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import { Heart, HeartOff } from "lucide-react";


const HeartButton = ({
    listingId,
    currentUser,
    listingType,
    className,
    size = 30,

}) => {

    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
        listingType,
    })


    return (
        <div
            onClick={toggleFavorite}
            className={cn(`
            relative
            hover:opacity-80
            transition
            cursor-pointer
                        `,
                className
            )}
        >

            <Heart size={size}
                className={
                    hasFavorited ? 'fill-primary' : 'fill-muted/30'
                } />

        </div>
    )
};

export default HeartButton