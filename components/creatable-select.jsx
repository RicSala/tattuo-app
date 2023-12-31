"use client";

import { apiClient } from "@/lib/apiClient";
import axios from "axios";
import React from "react";

import AsyncCreatableSelect from "react-select/async-creatable";

const filteredOptions = async (inputValue) => {
  const res = await apiClient.get(`/tags?s=${inputValue}`);

  const tags = res.data;

  return tags;
};
//

const promiseOptions = (inputValue) => {
  return filteredOptions(inputValue);
};

const handleCreate = async (inputValue) => {
  // send a post request to our api to create a new tag
  const res = await apiClient.post(`/tags/`, { label: inputValue });

  const newTag = res.data;

  return newTag;
};

const TagSelectorControlled = ({
  name,
  // trigger,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <AsyncCreatableSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      onCreateOption={async (input) => {
        const newTag = await handleCreate(input);
        // setValue(name, newTag)
        let newTags;
        if (value) newTags = [...value, newTag];
        else newTags = [newTag];
        onChange(newTags);
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
      loadingMessage={() => {
        return "...Cargando";
      }}
    />
  );
};
export default TagSelectorControlled;
