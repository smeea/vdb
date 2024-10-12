export const setLocalStorage = (storageId, value) => {
  window.localStorage.setItem(storageId, JSON.stringify(value));
};

export const getLocalStorage = (storageId) => {
  return JSON.parse(window.localStorage.getItem(storageId));
};
