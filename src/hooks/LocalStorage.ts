export default function useLocalStorage<T>(key: string): [() => T | null, (newValue: T | null) => void] {
  const getStoredValue = (): T | null => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  };

  const setStoredValue = (newValue: T | null) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [getStoredValue, setStoredValue];
}
