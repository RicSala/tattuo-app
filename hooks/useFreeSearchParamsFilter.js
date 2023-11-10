import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useFreeSearchParamsFilter = (debounceTime = 500) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [freeSearch, setFreeSearch] = useState("");
  const debouncedValue = useDebounce(freeSearch, debounceTime, "search");
  useEffect(() => {
    const freeSearchParams = qs.parse(searchParams.toString()).freeSearch;
    if (freeSearchParams) {
      setFreeSearch(freeSearchParams);
    }
  }, [searchParams]);

  const onFreeSearchClick = useCallback(() => {
    let query = {};
    if (searchParams) {
      query = qs.parse(searchParams.toString());
    }

    // if the value is empty, remove the freeSearch property from the query
    if (debouncedValue === "") {
      delete query.freeSearch;
    } else {
      query = { ...query, freeSearch: debouncedValue };
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true },
    );

    router.push(url);

    //TODO: not sure this is correct, but we obviously need to modify searchParams without causing more rerenders...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, pathname, router, searchParams]);

  // debounced search on typping

  useEffect(() => {
    if (debouncedValue || debouncedValue === "") {
      // console.log("debouncedValue from useffect", debouncedValue)
      onFreeSearchClick();
    }
  }, [debouncedValue, onFreeSearchClick]);

  return {
    freeSearch,
    setFreeSearch,
  };
};
