'use client'

import { useState } from "react";
import ArtistCard from "../listings/artist-card";
import ListingGrid from "../listings/listing-grid";
import Finder from "./Finder";


export default function MultiStepWithResults({
    currentUser
}) {

    const [profileMatches, setProfileMatches] = useState(null);

    if (!profileMatches) return (
        <Finder setResults={setProfileMatches} />
    );

    return (
        <ListingGrid>
            {profileMatches.map((profile) => (
                <ArtistCard
                    key={profile.id}
                    data={profile}
                    currentUser={currentUser}
                />
            ))}

        </ListingGrid>
    )
}