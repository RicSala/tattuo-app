'use client'

import ArtistCard from "@/components/listings/artist-card";
import ListingGrid from "@/components/listings/listing-grid";
import Finder from "@/components/multiStep/Finder";
import { useState } from "react";

export default function FinderClient({
    currentUser
}) {

    const [profileMatches, setProfileMatches] = useState(null);

    return (
        <>
            {/* {
                profileMatches ?
                    <ListingGrid>
                        {profileMatches.map((profile) => (
                            <ArtistCard
                                key={profile.id}
                                data={profile}
                                currentUser={currentUser}
                            />
                        ))}

                    </ListingGrid>
                    : */}
            <Finder setResults={setProfileMatches} />
            {/* } */}
        </>
    );
}