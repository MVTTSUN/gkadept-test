import { useEffect, useState } from "react";

type UseDebounceProps = {
  dependentValue: string;
  delay: number;
};

const DEFAULT_DELAY = 300;

export const useDebounce = (props: UseDebounceProps) => {
  const { dependentValue, delay = DEFAULT_DELAY } = props;
  const [debouncedValue, setDebouncedValue] = useState(dependentValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(dependentValue);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [dependentValue]);

  return debouncedValue;
};
