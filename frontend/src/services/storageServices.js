export const initFromStorage = (storageId, defaultValue, setFunction) => {
  let storage;
  try {
    storage = JSON.parse(window.localStorage.getItem(storageId));
  } catch (e) {
    storage = window.localStorage.getItem(storageId);
  }

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
  try {
    return JSON.parse(window.localStorage.getItem(storageId));
  } catch (e) {
    return window.localStorage.getItem(storageId);
  }
};
