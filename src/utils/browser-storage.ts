export const setLocalStorage = <T>(key: string, value: T, ttl: number) => {
  const now = new Date();
  const localStorageItem = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(localStorageItem));
};

export const getLocalStorage = <T>(key: string) => {
  const strValue = localStorage.getItem(key);
  const { value } = strValue
    ? (JSON.parse(strValue) as { value: T; expiry: number })
    : { value: null };
  return value as T;
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const setSessionStorage = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = <T>(key: string) => {
  const strValue = sessionStorage.getItem(key);
  const value = strValue ? (JSON.parse(strValue) as T) : null;
  return value as T;
};

export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
