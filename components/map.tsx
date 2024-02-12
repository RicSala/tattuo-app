"use client";

// REVIEW: Usefull links
// https://www.youtube.com/watch?v=s4n_x5B58Dw&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN&index=5

import {
    APIProvider,
    Map as BaseMap,
    Marker,
    MarkerProps,
    Pin,
    InfoWindow,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";

export function Map({
    center = { lat: 41.64, lng: -0.8978125 },
    zoom = 15,
    children = null,
    mapId = "363183913ebd8ffe",
}: {
    center: { lat: number; lng: number };
    zoom: number;
    children?: React.ReactNode;
    mapId: string;
}) {
    const [open, setOpen] = useState(false);
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className="h-full w-full">
                <BaseMap
                    zoom={15}
                    center={center}
                    mapId={mapId}
                    mapTypeControl={false}
                    streetViewControl={false}
                >
                    <AdvancedMarker
                        position={center}
                        onClick={() => setOpen(!open)}
                    >
                        <Pin
                            background="black"
                            borderColor="white"
                            glyphColor="gray"
                        />
                        {open && (
                            <InfoWindow
                                position={{
                                    ...center,
                                    lat: center.lat + 0.0025,
                                }}
                                onCloseClick={() => setOpen(false)}
                            >
                                {children}
                            </InfoWindow>
                        )}
                    </AdvancedMarker>
                </BaseMap>
            </div>
        </APIProvider>
    );
}
