"use client";

// REVIEW: Usefull links
// https://www.youtube.com/watch?v=s4n_x5B58Dw&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN&index=5

import {
  APIProvider,
  Map as BaseMap,
  AdvancedMarker,
  Marker,
  MarkerProps,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export function Map() {
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="h-full w-full">
        <BaseMap
          zoom={15}
          center={{ lat: 41.64, lng: -0.8978125 }}
          mapId="363183913ebd8ffe"
          mapTypeControl={false}
          streetViewControl={false}
        >
          <AdvancedMarker
            position={{ lat: 41.64, lng: -0.8978125 }}
            onClick={() => setOpen(!open)}
          >
            <Pin background="black" borderColor="white" glyphColor="gray" />
            {open && (
              <InfoWindow
                position={{ lat: 41.64, lng: -0.8978125 }}
                onCloseClick={() => setOpen(false)}
              >
                <div className="flex flex-col">
                  <h1>Estudio de tatuajes</h1>
                  <p>Estudio de tatuajes</p>
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
        </BaseMap>
      </div>
    </APIProvider>
  );
}
