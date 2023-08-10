'use client'

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';


const Select = dynamic(() => import('react-select'), {
    ssr: false,
    loading: () => (
        //render an input skeleton
        <div className="w-full h-10 bg-primary rounded animate-pulse"></div>
    ),
});


const selectStyles = {
    control: (provided, state) => ({ // this is the style of the container
        ...provided,
        border: "1px solid border-border ",
        boxShadow: "none",
        backgroundColor: "bg-background",
        borderColor: "border-border"
    }),

    menu: (provided, state) => ({ // this is the style of the menu
        ...provided,
        backgroundColor: "bg-background",
        color: "#000",
    }),

    option: (provided, state) => ({ // this is the style of the options
        ...provided,
        backgroundColor: state.isFocused ? "white" : "#030711",
        color: state.isFocused ? "text-primary-foreground" : "white",
    }),

    dropdownIndicator: (provided, state) => ({ // this is the style of the arrow
        ...provided,
        color: state.isFocused ? "gray" : "gray",
    }),

    indicatorSeparator: (provided, state) => ({ // this is the style of the line below the arrow
        ...provided,
        backgroundColor: state.isFocused ? "gray" : "gray",
    }),

    multiValueRemove: (provided, state) => ({ // this is the style of the X to remove the selected option
        ...provided,
        color: state.isFocused ? "gray" : "gray",
        "&:hover": {
            color: state.isFocused ? "gray" : "gray",
            backgroundColor: state.isFocused ? "white" : "gray",
        },
    }),



}


const CustomSelect = forwardRef(({
    //REVIEW: This is another way to destructure a prop
    value,
    onChange,
    onBlur,
    options,
    isMulti = false,
    placeholder = "Select...",
}, ref) => {

    //REVIEW: why can't I use errors[name] directly in the placeholder???
    // In Input.jsx I can do it, but here I can't
    // In Input.jsx we are doing {errors[id] && '- ' + (errors[id].message ? errors[id].message : '')}

    return (

        <>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isMulti={isMulti}
                placeholder={placeholder}
                isSearchable
                styles={selectStyles}

            />
        </>
    )
})
CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;