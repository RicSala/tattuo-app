'use client'

import axios from 'axios';
import { forwardRef } from 'react';
import PrimitiveAsyncSelect from 'react-select/async';


const getOptions = async (inputValue, resources) => {
    try {
        const res = await axios.get(`/api/${resources}?s=${inputValue}`)
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


const AsyncSelect = forwardRef(({
    placeholder = "Selecciona una opción",
    isMulti = false,
    isSearchable = true,
    value,
    onChange,
    onBlur,
    resources,
    noOptionsMessage = () => "Teclea para buscar",
}, ref) => {

    console

    return (
        <PrimitiveAsyncSelect
            ref={ref}
            cacheOptions
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isSearchable={isSearchable}
            // defaultOptions={defaultOptions}
            loadOptions={async (inputValue) => await getOptions(inputValue, resources)}
            placeholder={placeholder}
            isMulti={isMulti}
            noOptionsMessage={noOptionsMessage}



        // loadOptions={async (inputValue, callback) => {
        //     console.log("INPUT VALUE", inputValue);
        //     const options = await getOptions(inputValue)

        //     callback(options);
        // }}

        />
    )
});

AsyncSelect.displayName = "AsyncSelect";
export default AsyncSelect;