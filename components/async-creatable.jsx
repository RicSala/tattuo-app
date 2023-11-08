"use client";

import { apiClient } from "@/lib/apiClient";
import { forwardRef } from "react";

import AsyncCreatableSelect from "react-select/async-creatable";

const AsyncCreatable = forwardRef(
  (
    {
      control,
      name,
      trigger,
      rules,
      onBlur,
      onChange,
      value,
      onGetOptions,
      onCreateOption,
      isMulti = false,
      placeholder = "Selecciona",
    },
    ref,
  ) => {
    return (
      // TODO: Create está en inglés
      <AsyncCreatableSelect
        createOptionPosition="last"
        placeholder={placeholder}
        cacheOptions
        defaultOptions
        loadOptions={onGetOptions}
        onCreateOption={async (input) => {
          const newOption = await onCreateOption(input);
          // setValue(name, newTag)
          let selectedOptions;
          isMulti
            ? (selectedOptions = updateMulti(newOption))
            : (selectedOptions = newOption);

          onChange(selectedOptions);
          // trigger(name)
        }}
        onBlur={onBlur}
        onChange={(value) => {
          onChange(value);
          // trigger(name)
        }}
        value={value}
        isMulti={isMulti}
        isClearable={true}
        loadingMessage={() => {
          return "...Cargando";
        }}
      />
    );
  },
);

AsyncCreatable.displayName = "AsyncCreatable";

export default AsyncCreatable;

const updateMulti = (value, newOption) => {
  let newValueArray;
  if (value) {
    console.log({ value });
    newValueArray = [...value, newOption];
  } else newValueArray = [newOption];
  return newValueArray;
};
