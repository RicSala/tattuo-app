import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string";
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useDebounce } from "./useDebounce";


// given an artistId and a currentUser, returns:
// hasSaved: boolean => true if the user has Saved the listing
// toggleSave: function => toggles the Save status of the listing
export const useSearchParamsFilter = (searchParamName) => {

    const [selected, setSelected] = useState([])
    const searchParams = useSearchParams();
    const pathname = usePathname() // current path
    const router = useRouter();
    const debouncedValue = useDebounce(selected, 500)





        // Apply the selection in the filter UI immediately
        const toggleSelectedFilter = (toggledselected) => {
            if (selected.includes(toggledselected)) {
                setSelected(selected.filter(selectedItem => selectedItem !== toggledselected));
            } else {
                setSelected([...selected, toggledselected]);
            }
        };


    useEffect(() => {
        const currentFilter = qs.parse(searchParams.toString())[searchParamName]?.split(",")
        if (currentFilter) {
            setSelected(currentFilter)
        }
    }, [searchParamName, searchParams])



        // Apply the filter in in the results debounced (with the useEffect below)
        const applyFilters = useCallback(() => {
            // setShow(false); // as we are using debounce, no need to close it anymore so the user can keep clicking and adding filters
    
            // if this filter has not selections...
            if (selected.length === 0) {
                // ...remove the search param of THIS filter from the url
                const currentQuery = qs.parse(searchParams.toString());
                delete currentQuery[searchParamName];
                // create a new url without it
                const url = qs.stringifyUrl({
                    url: pathname,
                    query: currentQuery
                },
                    { skipNull: true })
                // and push it
                return router.push(url)
            }
    
            // otherwise we update the searchParam
            let currentQuery = {};
            if (searchParams) {
                currentQuery = qs.parse(searchParams.toString()); // why do we need this? sanitization?
            }
    
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    ...currentQuery,
                    [searchParamName]: selected.join(','),
                }
            },
                {
                    skipNull: true,
                }
            )
    
            router.push(url)
        }, [pathname, router, searchParams, selected, searchParamName])
    
        // apply the filter when debouncedValue changes
        useEffect(() => {
            if (debouncedValue) { applyFilters() }
        }, [applyFilters, debouncedValue]);


        return {
            toggleSelectedFilter,
            selected,
            setSelected
        }
}