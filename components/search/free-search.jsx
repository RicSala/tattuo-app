'use client'

import { SearchIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";
import { useDebounce } from "@/hooks/useDebounce";


export default function FreeSearch({

}) {

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

        let query = {};
        if (searchParams) {
            query = qs.parse(searchParams.toString());
        }

        if (freeSearch) query = { ...query, freeSearch }

        const url = qs.stringifyUrl({
            url: pathname,
            query,
        },
            { skipNull: true, }
        )

        router.push(url)
        router.refresh()
    }, [freeSearch, pathname, router, searchParams])


    // debounced search on typping
    useEffect(() => {
        if (debouncedValue) {

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
                        onFreeSearchClick()
                    }
                }}
            />
            <Button className='
            flex flex-row gap-2
            '
                variant="secondary"
                onClick={() => {
                    onFreeSearchClick()
                }}
            >
                <SearchIcon className="inline" size={20} />
                Buscar
            </Button>

        </div>
    );
}