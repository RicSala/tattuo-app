"use client";

import { apiClient } from "@/lib/apiClient";
import { forwardRef } from "react";
import PrimitiveAsyncSelect from "react-select/async";

const getOptions = async (inputValue, resources) => {
  try {
    const res = await apiClient.get(`/${resources}?s=${inputValue}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// <
//   React.ElementRef<typeof SheetPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
// >

/**
 * @typedef {typeof PrimitiveAsyncSelect} AsyncSelectType
 */

/**
 * and we give it to the forward ref (first is the ref, second is the type we created in the previous step)
 * @type {AsyncSelectType}
 */
const AsyncSelect = forwardRef(
  (
    {
      placeholder = "Selecciona una opción",
      isMulti = false,
      isSearchable = true,
      value,
      onChange,
      onBlur,
      resources,
      noOptionsMessage = () => "Teclea para buscar",
    },
    ref,
  ) => {
    return (
      <PrimitiveAsyncSelect
        ref={ref}
        cacheOptions
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isSearchable={isSearchable}
        loadOptions={async (inputValue) =>
          await getOptions(inputValue, resources)
        }
        placeholder={placeholder}
        isMulti={isMulti}
        noOptionsMessage={noOptionsMessage}
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
        //TODO: investigate why not all classes are being applied!!
        // styles={{
        //   option: (provided, state) => ({
        //     // this is the style of the options
        //     ...provided,
        //     backgroundColor: state.isFocused ? "white" : "#030711",
        //     color: state.isFocused ? "black" : "white",
        //   }),

        //   menu: (provided, state) => ({
        //     // this is the style of the menu
        //     ...provided,
        //     backgroundColor: "#030711",
        //     color: "#000",
        //   }),

        //   singleValue: (provided, state) => ({
        //     // this is the style of the selected option
        //     ...provided,
        //     color: "grey",
        //   }),

        //   dropdownIndicator: (provided, state) => ({
        //     // this is the style of the arrow
        //     ...provided,
        //     display: "none",
        //   }),

        //   control: (provided, state) => ({
        //     // this is the style of the container
        //     ...provided,
        //     border: "1px solid border-border ",
        //     boxShadow: "none",
        //     backgroundColor: "bg-background",
        //     borderColor: "border-border",
        //     color: "grey",
        //   }),

        //   indicatorSeparator: (provided, state) => ({
        //     // this is the style of the line that separates the arrow from the container
        //     ...provided,
        //     display: "none",
        //   }),

        //   container: (provided, state) => ({
        //     // this is the style of the container
        //     ...provided,
        //     backgroundColor: "",
        //   }),

        //   input: (provided, state) => ({
        //     // this is the style of the input
        //     ...provided,
        //     color: "grey",
        //   }),
        // }}
      />
    );
  },
);

AsyncSelect.displayName = "AsyncSelect";
export default AsyncSelect;
