"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { GroupBase, Props } from "react-select";
import type {} from "react-select/base";
// This import is necessary for module augmentation.
// It allows us to extend the 'Props' interface in the 'react-select/base' module
// and add our custom property 'myCustomProp' to it.
declare module "react-select/base" {
    export interface Props<
        Option,
        IsMulti extends boolean,
        Group extends GroupBase<Option>,
    > {
        afterChange?: () => void;
    }
}

const Select = dynamic(() => import("react-select"), {
    ssr: false,
    loading: () => (
        //render an input skeleton
        <div className="h-10 w-full animate-pulse rounded bg-primary"></div>
    ),
});

const CustomSelect = forwardRef(
    <
        Option,
        IsMulti extends boolean = false,
        Group extends GroupBase<Option> = GroupBase<Option>,
    >(
        {
            value,
            onChange,
            onBlur,
            options,
            isMulti,
            placeholder = "Select...",
            afterChange = () => {},
        }: Props<Option, IsMulti, Group>,
        ref: any,
    ) => {
        //REVIEW: why can't I use errors[name] directly in the placeholder???
        // In Input.jsx I can do it, but here I can't
        // In Input.jsx we are doing {errors[id] && '- ' + (errors[id].message ? errors[id].message : '')}

        return (
            <>
                <Select
                    ref={ref}
                    options={options}
                    value={value}
                    afterChange={afterChange}
                    onChange={(e) => {
                        onChange(e);
                        afterChange();
                    }}
                    onBlur={onBlur}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    isSearchable
                    //   styles={selectStyles}
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
            </>
        );
    },
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
