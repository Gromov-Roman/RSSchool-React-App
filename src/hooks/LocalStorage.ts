import { useEffect, useState } from 'react';
import { isClient } from '@utils/is-client';

interface UseLocalStorage<T> {
  value: T | null;
  getValue: () => T | null;
  setValue: (newValue: T | null) => void;
}

export default function useLocalStorage<T>(key: string, defaultValue: T | null = null): UseLocalStorage<T> {
  const getValue = () => {
    const itemValue = isClient ? localStorage.getItem(key) : null;
    return itemValue ? (JSON.parse(itemValue) as T) : defaultValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return { value, getValue, setValue };
}
