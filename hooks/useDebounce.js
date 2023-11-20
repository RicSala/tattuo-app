import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500, text = "filter") {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    console.log("debouncing");
    console.log({ value });

    const handler = setTimeout(() => {
      console.log("setting after", delay, "seconds debounced");
      console.log("Value is: ", value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
