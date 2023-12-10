"use client";

import { apiClient } from "@/lib/apiClient";
import { forwardRef } from "react";

import AsyncCreatableSelect from "react-select/async-creatable";
/**
 * @typedef {ForwardRefExoticComponent<RefAttributes<HTMLSelectElement>>} Option
 * @@type {Option}
 */
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
      createLabel = "Crear perfil de ",
    },
    ref,
  ) => {
    const formatCreateLabel = (inputValue) => `${createLabel}${inputValue}`;

    return (
      // TODO: Create está en inglés
      <AsyncCreatableSelect
        formatCreateLabel={formatCreateLabel}
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
            ? (selectedOptions = updateMulti(value, newOption))
            : (selectedOptions = newOption);
          console.log({ selectedOptions });
          console.log({ value });

          onChange(selectedOptions);
          // trigger(name)
        }}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        isMulti={isMulti}
        isClearable={true}
        loadingMessage={() => {
          return "...Cargando";
        }}
        classNames={{
          menuList: (state) => "text-black",
        }}
      />
    );
  },
);

AsyncCreatable.displayName = "AsyncCreatable";

export default AsyncCreatable;

const updateMulti = (value, newOption) => {
  console.log("from update", { value });
  let newValueArray;
  if (value) {
    newValueArray = [...value, newOption];
  } else newValueArray = [newOption];
  return newValueArray;
};
