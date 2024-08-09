export const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] ? JSON.parse(store[key]) : null;
    },
    setItem(key: string, value: unknown) {
      store[key] = JSON.stringify(value);
    },
    clear() {
      store = {};
    },
  };
})();
