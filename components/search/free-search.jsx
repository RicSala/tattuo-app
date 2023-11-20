"use client";

import { Input } from "../ui/input";
import { forwardRef } from "react";
import { useFreeSearchParamsFilter } from "@/hooks/useFreeSearchParamsFilter";

const FreeSearch = forwardRef(({}, ref) => {
  const { freeSearch, setFreeSearch } = useFreeSearchParamsFilter();
  return (
    <div
      className="
        flex 
        min-w-[150px]
        flex-1
        flex-row
        items-center
        gap-2
        "
    >
      <Input
        ref={ref}
        className="
                basis-30
                max-w-[400px]
                flex-1
                items-start
                rounded-md
                border-[2px]
                border-border
            px-5
            py-2
            "
        name="location"
        type="text"
        placeholder="Búsqueda libre"
        value={freeSearch}
        onChange={(e) => {
          console.log("search: ", e.target.value);
          setFreeSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // onFreeSearchClick()
          }
        }}
      />
    </div>
  );
});

FreeSearch.displayName = "FreeSearch";

export default FreeSearch;
