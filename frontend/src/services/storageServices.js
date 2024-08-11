export const initFromStorage = (storageId, defaultValue, setFunction) => {
  const storage = JSON.parse(window.localStorage.getItem(storageId));

  if (storage !== null) {
    setFunction(storage);
  } else {
    setFunction(defaultValue);
  }
};

export const setLocalStorage = (storageId, value) => {
  window.localStorage.setItem(storageId, JSON.stringify(value));
};

export const getLocalStorage = (storageId) => {
  return JSON.parse(window.localStorage.getItem(storageId));
};
