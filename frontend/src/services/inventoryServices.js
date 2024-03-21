import { inventoryStore } from '@/context';
import { DEFAULT_OPTIONS } from '@/utils/constants';

export const addCards = (cards) => {
  const c = {};
  Object.values(cards).forEach((card) => {
    if (card.q !== 0) {
      c[card.c.Id] = card.q;
    }
  });

  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify(c),
  };
  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};

export const setCard = (cardid, count) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ [cardid]: { q: count } }),
  };
  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};

export const setCardText = (cardid, text) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ [cardid]: { t: text } }),
  };
  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};

export const getSharedInventory = (key, cryptCardBase, libraryCardBase) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory/${key}`;
  const options = {};

  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      const crypt = {};
      const library = {};
      Object.keys(data.crypt).forEach((k) => {
        crypt[k] = { ...data.crypt[k], c: cryptCardBase[k] };
      });
      Object.keys(data.library).forEach((k) => {
        library[k] = { ...data.library[k], c: libraryCardBase[k] };
      });
      return { crypt, library };
    });
};

export const createSharedInventory = (key) => {
  const url = `${import.meta.env.VITE_API_URL}/account`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ inventoryKey: key }),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};

export const deleteInventory = () => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  const options = {
    method: 'DELETE',
  };

  fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(() => {
    inventoryStore.crypt = {};
    inventoryStore.library = {};
  });
};
