"use client";

import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { AsyncSelect } from "./async-select";

const CitiesAsyncSelect = ({
  searchParamName,
  className,
  // rest fo the props
  ...props
}) => {
  const { onChange, value } = useUpdateSearchParams({
    searchParamName,
  });

  return (
    <div className="min-w-[200px]">
      <AsyncSelect
        placeholder="Ciudad"
        resources={"cities"}
        value={value}
        className={className}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default CitiesAsyncSelect;
