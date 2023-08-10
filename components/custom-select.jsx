'use client'

import dynamic from 'next/dynamic';


const Select = dynamic(() => import('react-select'), {
    ssr: false,
    loading: () => (
        //render an input skeleton
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
    ),
});


const selectStyles = {
    control: (provided, state) => ({ // this is the style of the container
        ...provided,
        border: state.isFocused ? "1px solid #000" : "1px solid #000",
        boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
        "&:hover": {
            border: state.isFocused ? "1px solid #000" : "1px solid #000",
        },
    }),
    option: (provided, state) => ({ // this is the style of the options
        ...provided,
        backgroundColor: state.isFocused ? "#000" : "#fff",
        color: state.isFocused ? "#fff" : "#000",
    }),

    dropdownIndicator: (provided, state) => ({ // this is the style of the arrow
        ...provided,
        color: state.isFocused ? "#000" : "#000",
    }),

    indicatorSeparator: (provided, state) => ({ // this is the style of the line below the arrow
        ...provided,
        backgroundColor: state.isFocused ? "#000" : "#000",
    }),

    multiValueRemove: (provided, state) => ({ // this is the style of the X to remove the selected option
        ...provided,
        color: state.isFocused ? "#000" : "#000",
        "&:hover": {
            color: state.isFocused ? "#000" : "#000",
            backgroundColor: state.isFocused ? "#000" : "#000",
        },
    }),
}


const CustomSelect = ({
    //REVIEW: This is another way to destructure a prop
    field: {
        value,
        onChange,
        onBlur,
    },

    options,
    isMulti = false,
    placeholder = "Select...",
    errors,
    name,
}) => {

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
                placeholder={placeholder + `${errors && errors[name] ? " - ".concat(errors[name].message) : ""}`}
                isSearchable
                styles={selectStyles}
            // noOptionsMessage={() => "No hay opciones"}

            />
        </>
    )
};
export default CustomSelect;