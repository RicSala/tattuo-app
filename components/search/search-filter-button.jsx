'use client'

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import qs from "query-string";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const SearchFilterButton = ({
    title = 'Filtros',
    options = [],
    searchParamName     // name of the searchParam that the button should stablish in the url
}) => {


    //TODO: fix the debounce func. It's searching way too many times. Check the network console.


    const menuRef = useRef(null); // ref of the menu, so we can hide it when clicking outside of it
    const [selected, setSelected] = useState([])


    const [show, setShow] = useState(false); // should we show the menu?
    const pathname = usePathname() // current path
    const router = useRouter();
    const searchParams = useSearchParams();
    const debouncedValue = useDebounce(selected, 500)


    useEffect(() => {
        const currentFilter = qs.parse(searchParams.toString())[searchParamName]?.split(",")
        if (currentFilter) {
            setSelected(currentFilter)
        }
    }, [searchParamName, searchParams])




    // close the menu when clicking outside of it
    const handleClickOutside = useCallback((event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShow(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
    // End of snippet (ref added to the div below)

    // Apply the selection in the filter UI immediately
    const toggleSelectedFilter = (toggledselected) => {
        if (selected.includes(toggledselected)) {
            setSelected(selected.filter(selectedItem => selectedItem !== toggledselected));
        } else {
            setSelected([...selected, toggledselected]);
        }
    };

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
        router.refresh() // so server components are updated
    }, [pathname, router, searchParams, selected, searchParamName])

    // apply the filter when debouncedValue changes
    useEffect(() => {
        if (debouncedValue) { applyFilters() }
    }, [applyFilters, debouncedValue]);

    return (
        <div className="relative z-10"
            ref={menuRef}
        >
            <Button className="  
                relative
                flex flex-row gap-2
                "
                variant="secondary"
                onClick={() => setShow(!show)}
            >

                <FilterIcon size={20} />
                <p className=''>
                    {title}
                </p>
                {
                    selected.length > 0 &&
                    <div className="bg-primary/30 rounded-full px-2 py-1 text-xs
                    absolute right-0 -bottom-1.5
                    "
                    // TODO: make it change to cross to delete all the filter of the button when clicked
                    // onClick={(event) => {
                    //     alert("hello")
                    // }}
                    >
                        {selected.length}
                    </div>
                }
            </Button>
            <div className="absolute mt-3">
                {show && <div className="bg-background border-border border rounded-md shadow-md p-2 min-w-[200px]">
                    {options.map((option, index) => (
                        <div key={option.label} className={clsx(`
                        px-5 
                        py-2 
                        hover:bg-secondary 
                        cursor-pointer
                        rounded-md
                        ${selected.includes(option.label) && `bg-secondary`}
                        ${selected.includes(option.label) && `font-bold`}
                        
                        
                        `)}


                            onClick={() => toggleSelectedFilter(option.label)}
                        >
                            {option.label}
                        </div>
                    ))}
                    {/* <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => applyFilters()}
                    >
                        Aplicar filtros
                    </Button> */}
                </div>}


            </div>


        </div>
    )
};
export default SearchFilterButton;