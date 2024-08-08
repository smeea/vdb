import ky from 'ky';

export const changesLoader = () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  const response = ky.get(url).json();
  return { changes: response };
};

export const pdaToggle = (deckid, isDelete) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/favorite/${deckid}`;
  return ky(url, { method: isDelete ? 'DELETE' : 'POST' });
};
