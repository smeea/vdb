import ky from 'ky';
import { inventoryStore } from '@/context';
import { CRYPT, LIBRARY } from '@/constants';

export const addCards = (cards) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;

  const c = {};
  Object.values(cards).forEach((card) => {
    if (card.q !== 0) {
      c[card.c[ID]] = card.q;
    }
  });

  return ky.patch(url, { json: c });
};

export const setCard = (cardid, count) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  return ky.put(url, { json: { [cardid]: { q: count } } });
};

export const setCardText = (cardid, text) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  return ky.put(url, { json: { [cardid]: { t: text } } });
};

export const update = (field, value) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  return ky.put(url, { json: { [field]: value } });
};

export const getSharedInventory = (key, cryptCardBase, libraryCardBase) => {
  const url = `${import.meta.env.VITE_API_URL}/inventory/${key}`;

  return ky
    .get(url)
    .json()
    .then((data) => {
      const crypt = {};
      const library = {};
      Object.keys(data[CRYPT]).forEach((k) => {
        crypt[k] = { ...data[CRYPT][k], c: cryptCardBase[k] };
      });
      Object.keys(data[LIBRARY]).forEach((k) => {
        library[k] = { ...data[LIBRARY][k], c: libraryCardBase[k] };
      });
      return { crypt, library };
    });
};

export const createSharedInventory = (key) => {
  const url = `${import.meta.env.VITE_API_URL}/account`;
  return ky.put(url, { json: { inventoryKey: key } });
};

export const deleteInventory = () => {
  const url = `${import.meta.env.VITE_API_URL}/inventory`;
  ky.delete(url).then(() => {
    inventoryStore[CRYPT] = {};
    inventoryStore[LIBRARY] = {};
  });
};
