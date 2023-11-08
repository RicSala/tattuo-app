"use client";

import SearchFilterButton from "./search-filter-button";
import FreeSearch from "./free-search";
import AsyncSelect from "../async-select";

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
const SearchBar = ({ children }) => {
  return (
    <div
      className="
            relative
            my-8
            flex
            flex-row
            flex-wrap
            justify-between
            gap-6
        "
    >
      {children}
    </div>
  );
};

export default SearchBar;
