'use client'

import axios from 'axios';
import { forwardRef } from 'react';

import AsyncCreatableSelect from 'react-select/async-creatable';


const filteredOptions = async (inputValue) => {

    const res = await axios.get(`/api/tags?s=${inputValue}`)
    const tags = res.data
    return tags
};

const promiseOptions = (inputValue) => {

    return filteredOptions(inputValue)
}

const handleCreate = async (inputValue) => {

    // send a post request to our api to create a new tag
    const res = await axios.post(`/api/tags/`, { label: inputValue })

    const newTag = res.data

    return newTag
}



const AsyncCreatable = forwardRef(({
    control,
    name,
    trigger,
    rules,
    onBlur,
    onChange,
    value

}, ref) => {


    return (

        <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            onCreateOption={async (input) => {
                const newTag = await handleCreate(input)
                // setValue(name, newTag)
                let newTags
                if (value) newTags = [...value, newTag]
                else newTags = [newTag]
                onChange(newTags)
                // trigger(name)
            }}
            onBlur={onBlur}
            onChange={(value) => {
                onChange(value);
                // trigger(name)
            }}
            value={value}
            isMulti={true}
            isClearable={true}
            loadingMessage={() => { return "...Cargando" }}
        />

    )
})

AsyncCreatable.displayName = 'AsyncCreatable';

export default AsyncCreatable
