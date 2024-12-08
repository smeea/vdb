import ky from 'ky';

export const changesLoader = async () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  return ky.get(url).json();
};

export const pdaToggle = (deckid, isDelete) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/favorite/${deckid}`;
  return ky(url, { method: isDelete ? 'DELETE' : 'POST' });
};
