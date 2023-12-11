"use client";

import { apiClient } from "@/lib/apiClient";
import { HtmlHTMLAttributes, forwardRef } from "react";
import PrimitiveAsyncSelect from "react-select/async";

const getOptions = async (inputValue: string, resources: Resources) => {
  try {
    const res = await apiClient.get(`/${resources}?s=${inputValue}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

// <
//   React.ElementRef<typeof SheetPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
// >

type Resources = "tattoos" | "artists";

interface AsyncSelectProps {
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  value?: any;
  onChange?: any;
  onBlur?: any;
  resources: Resources;
  noOptionsMessage?: any;
  defaultInputValue?: string;
  loadOptions?: () => Promise<any>;
  props?: any;
}
export const AsyncSelect = forwardRef<HTMLSelectElement, AsyncSelectProps>(
  (
    {
      placeholder = "Selecciona una opción",
      isMulti = false,
      isSearchable = true,
      value,
      onChange,
      onBlur,
      resources,
      defaultInputValue = undefined,
      noOptionsMessage = () => "Teclea para buscar",
      ...props
    },
    ref,
  ) => {
    return (
      <PrimitiveAsyncSelect
        defaultInputValue={defaultInputValue}
        // @ts-ignore
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
        classNames={selectStyles}
      />
    );
  },
);

AsyncSelect.displayName = "AsyncSelect";

export const selectStyles = {
  menuList: () => "text-gray-500",
  input: () => "text-white",
  container: () => "",
  // control: () => "border border-red-400",
  menu: () => "",
  valueContainer: () => "bg-background border-border",
  control: () => "!border !border-border",
  placeholder: () => "",
  singleValue: () => "!text-primary",
};
