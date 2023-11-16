import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useUpdateSearchParams = ({ searchParamName }) => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentFilter = qs
      .parse(searchParams.toString())
      [searchParamName]?.split(",");
    if (currentFilter) {
      //actually, we should do an api call, but for now this will be enough
      setSelected({
        label: currentFilter,
        value: currentFilter,
      });
    }
  }, [searchParamName, searchParams]);

  const onChange = useCallback(
    (value) => {
      setSelected(() => ({
        label: value.label,
        value: value.value,
      }));

      let query = {};
      if (searchParams) {
        query = qs.parse(searchParams.toString());
      }

      query = {
        ...query,
        [searchParamName]: value?.label,
      };

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
    },
    [pathname, router, setSelected, searchParams],
  );

  return {
    onChange,
    value: selected,
  };
};

export default useUpdateSearchParams;
