import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500, text = "filter") {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    console.log("debouncing");

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
