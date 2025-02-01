const getLocalValue = <T>(key: string): T => {
  const itemValue = localStorage.getItem(key);

  return itemValue && itemValue !== 'undefined' ? JSON.parse(itemValue) : '';
};

const setLocalValue = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

type LocalValue<T> = {
  get: () => T;
  set: (value: T) => void;
};

export const createLocalValue = <T>(key: string): LocalValue<T> => {
  return {
    get: () => <T>getLocalValue(key),
    set: (value: T) => <T>setLocalValue(key, value),
  };
};
