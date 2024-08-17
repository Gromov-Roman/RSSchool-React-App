import { useEffect, useState } from 'react';

interface UseLocalStorage<T> {
  value: T | null;
  getValue: () => T | null;
  setValue: (newValue: T | null) => void;
}

export default function useLocalStorage<T>(key: string, defaultValue: T | null = null): UseLocalStorage<T> {
  const getValue = () => {
    const itemValue = localStorage.getItem(key);
    return itemValue ? (JSON.parse(itemValue) as T) : defaultValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value, key]);

  return { value, getValue, setValue };
}
