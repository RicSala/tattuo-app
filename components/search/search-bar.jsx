'use client'

import SearchFilterButton from './search-filter-button';
import FreeSearch from './free-search';
import AsyncSelect from '../async-select';



/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
const SearchBar = ({
    children
}) => {

    console.log("searchBar called")

    return (
        <div
            className="
            relative
            flex
            flex-row
            justify-between
            gap-6
            my-8
            flex-wrap
        "
        >
            {children}
        </div>
    )
};

export default SearchBar;