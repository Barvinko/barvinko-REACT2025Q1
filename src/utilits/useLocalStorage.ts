import { useEffect, useState } from 'react';

const getLocalValue = <T>(key: string, initValue: T): T => {
  if (typeof window === 'undefined') {
    return initValue;
  }
  const itemValue = localStorage.getItem(key);

  const localValue: T =
    itemValue && itemValue !== 'undefined'
      ? JSON.parse(itemValue as string)
      : '';

  if (localValue) {
    return localValue;
  }

  if (initValue instanceof Function) {
    return initValue();
  }

  return initValue;
};

export const useLocalStorage = <T>(key: string, initValue: T) => {
  const [value, setValue] = useState<T>(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
