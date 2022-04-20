import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    
    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
