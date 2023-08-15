'use client'

import { SearchIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import qs from "query-string";
import { useDebounce } from "@/hooks/useDebounce";


const FreeSearch = forwardRef(({

}, ref) => {

    const [freeSearch, setFreeSearch] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()
    const debouncedValue = useDebounce(freeSearch, 500, "search")



    // can't remember why we needed this -> to keep the string in the input when no results are found
    useEffect(() => {
        const freeSearchParams = qs.parse(searchParams.toString()).freeSearch
        if (freeSearchParams) {
            setFreeSearch(freeSearchParams)
        }
    }, [searchParams])


    const onFreeSearchClick = useCallback(() => {

        // console.log('❗️freesearchclick')

        let query = {};
        if (searchParams) {
            query = qs.parse(searchParams.toString());
        }

        query = { ...query, freeSearch: debouncedValue }

        const url = qs.stringifyUrl({
            url: pathname,
            query,
        },
            { skipNull: true, }
        )

        router.push(url)

        //TODO: not sure this is correct, but we obviously need to modify searchParams without causing more rerenders...
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, pathname, router,
        searchParams
    ])


    // debounced search on typping
    useEffect(() => {

        if (debouncedValue || debouncedValue === "") {
            // console.log("debouncedValue from useffect", debouncedValue)

            onFreeSearchClick()
        }

    }, [debouncedValue, onFreeSearchClick]);

    return (
        <div className='
        flex 
        flex-row 
        flex-1
        gap-2
        items-center
        
        '>
            <Input
                ref={ref}
                className='
                flex-1
                basis-30
                max-w-[400px]
                px-5
                py-2
                rounded-md
                border-border
            items-start
            border-[2px]
            '
                name="location"
                type="text"
                placeholder="Búsqueda libre"
                value={freeSearch}
                onChange={(e) => {
                    setFreeSearch(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        // onFreeSearchClick()
                    }
                }}
            />

        </div>
    );
})

FreeSearch.displayName = "FreeSearch"

export default FreeSearch