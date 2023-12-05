"use client";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import PrimitiveAsyncSelect from "react-select/async";

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
import { useEffect, useState } from "react";

export function PlacesAutocompleteMap() {
  const [open, setOpen] = useState(false);
  const {
    ready, // whether is ready to use having loaded the Google Maps JavaScript API
    value, // the value entered in the input
    setValue,
    suggestions: { status, data },
    clearSuggestions, // to be called after the user selects a suggestion
  } = usePlacesAutocomplete({});
  const [selected, setSelected] = useState({});

  return (
    <APIProvider
      apiKey={"AIzaSyA60IfgEhUb9r0gMcYbkR0oKMFSAUTUR_I"}
      libraries={["places"]}
    >
      {ready ? "ready" : "not ready"}

      <PrimitiveAsyncSelect
        // ref={ref}
        // cacheOptions
        value={value}
        isDisabled={!ready}
        onChange={async (selection) => {
          console.log("selection", selection);
          const results = await getGeocode({ address: selection.value });
          const { lat, lng } = await getLatLng(results[0]);
          console.log("lat", lat);
          console.log("lng", lng);
          setSelected({ lat, lng });
        }}
        // onBlur={onBlur}
        isSearchable={true}
        loadOptions={async (string) => {
          setValue(string);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const formattedData = data.map((suggestion) => ({
            value: suggestion.description,
            label: suggestion.description,
            ...suggestion,
          }));
          return formattedData;
        }}
        classNames={{
          menuList: (state) => "text-black",
          input: (state) => "",
          container: () => "",
          // control: () => "border border-red-400",
          menu: () => "",
          valueContainer: () => "bg-background border-border",
          placeholder: () => "",
          // "text-red-500",
        }}
      />
      <div className="h-full w-full">
        <BaseMap
          zoom={15}
          center={{ lat: 41.64, lng: -0.8978125 }}
          mapId="363183913ebd8ffe"
          mapTypeControl={false}
          streetViewControl={false}
        >
          {selected && selected.lat && selected.lng && (
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
          )}
        </BaseMap>
      </div>
    </APIProvider>
  );
}
