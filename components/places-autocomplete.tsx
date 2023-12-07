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
import React, { useEffect, useState } from "react";
import { data } from "autoprefixer";
import { get } from "http";
import { Label } from "./ui/label";

export function PlacesAutocompleteMap({
  studioName,
  form,
}: {
  studioName: string;
  form: any;
}) {
  const [open, setOpen] = useState(false);
  const {
    ready, // whether is ready to use having loaded the Google Maps JavaScript API
    value, // the value entered in the input
    setValue,
    suggestions: { status, data },
    clearSuggestions, // to be called after the user selects a suggestion
  } = usePlacesAutocomplete({});
  const [selected, setSelected] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const getGeoCode = async () => {
      const geocode = await getGeocode({ address: studioName });
      const coordinates = await getLatLng(geocode[0]);
      form.setValue("latitude", coordinates.lat);
      form.setValue("longitude", coordinates.lng);

      return coordinates;
    };

    getGeoCode().then((coordinates) => {
      setSelected(coordinates);
    });
  }, [studioName, value]);

  return (
    <>
      <Label>Busca tu estudio</Label>
      <PrimitiveAsyncSelect
        defaultInputValue={studioName}
        // ref={ref}
        // cacheOptions
        value={value}
        // isDisabled={!ready}
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
          center={selected}
          mapId="363183913ebd8ffe"
          mapTypeControl={false}
          streetViewControl={false}
        >
          {selected && selected.lat && selected.lng && (
            <AdvancedMarker position={selected} onClick={() => setOpen(!open)}>
              <Pin background="black" borderColor="white" glyphColor="gray" />
              {open && (
                <InfoWindow
                  position={{ ...selected, lat: selected.lat + 0.0015 }}
                  onCloseClick={() => setOpen(false)}
                >
                  <div className="fle flex-col gap-2">
                    <h3>{studioName}</h3>
                    <p>{}</p>
                    <p>{}</p>
                  </div>
                </InfoWindow>
              )}
            </AdvancedMarker>
          )}
        </BaseMap>
      </div>
    </>
  );
}
