"use client";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
  getZipCode,
} from "use-places-autocomplete";
import PrimitiveAsyncSelect from "react-select/async";

// REVIEW: Usefull links
// https://www.youtube.com/watch?v=s4n_x5B58Dw&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN&index=5
// https://developers.google.com/maps/documentation/geocoding/requests-geocoding?hl=es-419#RegionCodes

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
import BaseError, { createBaseError } from "@/errors/CustomError";

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
      console.log("studioName", studioName);
      //   try {
      const geocode = await getGeocode({
        address: studioName,
        language: "es",
        region: "es",
      });
      const coordinates = getLatLng(geocode[0]);
      form.setValue("latitude", coordinates.lat);
      form.setValue("longitude", coordinates.lng);
      return coordinates;
      //   } catch (error) {
      //     console.log("error", error);
      //   }
    };
    console.log("form", form.getValues("id", "images"));

    if (form.getValues("id") !== "new") {
      getGeoCode().then((coordinates) => {
        setSelected(coordinates);
      });
    }
  }, [form, studioName]);

  return (
    <>
      <Label
        className={`
      ${
        form.formState.errors.latitude?.message ||
        form.formState.errors.longitude?.message
          ? "text-destructive"
          : ""
      }`}
      >
        Busca tu estudio
      </Label>
      <PrimitiveAsyncSelect
        defaultInputValue={studioName}
        // ref={ref}
        // cacheOptions
        value={{
          value: value,
          label: value,
        }}
        onBlur={() => {
          form.trigger("latitude");
          form.trigger("longitude");
        }}
        // isDisabled={!ready}
        onChange={async (selection) => {
          setValue(selection.value);
          //   console.log("selection", selection);
          try {
            const results = await getGeocode({
              address: selection.value,
            });
            // console.log("results", results);
            // const details = await getDetails({
            //   placeId: selection.place_id,
            //   //   fields: ["locality"],
            // });

            // if (!results[0].types.includes("store")) {
            //   alert("no es un estudio");
            //   throw new BaseError(
            //     "ERROR - Not localized",
            //     null,
            //     400,
            //     true,
            //     "ERROR - Not localized",
            //     "El lugar seleccionado no es un estudio",
            //     "Por favor, selecciona un estudio",
            //   );
            // }

            // console.log("details", details);
            // // get the the string that goes from the last comman to the end of the string of details.vicinity
            // const city = details.vicinity.split(",").slice(-1)[0];
            // // console.log("city", city);
            // form.setValue("city", {
            //   label: city,
            //   value: city,
            // });

            // TODO: the way to get the city is a bit hacky. another alternative would be to use the zip code
            // const zipCode = getZipCode(results[0], false);
            // console.log("zipCode", zipCode);
            const { lat, lng } = getLatLng(results[0]);
            // console.log("lat", lat);
            // console.log("lng", lng);
            setSelected({ lat, lng });
            form.setValue("latitude", lat);
            form.setValue("longitude", lng);
          } catch (error) {
            console.log("error here:", error);
            throw error;
          }
        }}
        // onBlur={onBlur}
        isSearchable={true}
        loadOptions={async (string) => {
          setValue(string);
          //   await new Promise((resolve) => setTimeout(resolve, 1000));
          const formattedData = data.map((suggestion) => ({
            value: suggestion.description,
            label: suggestion.description,
            ...suggestion,
          }));

          //   console.log("formattedData", formattedData);

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
        <Label
          className={`
      ${
        form.formState.errors.latitude?.message ||
        form.formState.errors.longitude?.message
          ? "text-destructive"
          : ""
      }`}
        >
          {form.formState.errors.latitude?.message ||
            form.formState.errors.longitude?.message}
        </Label>
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
