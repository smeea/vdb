import ky from 'ky';
import { defer } from 'react-router-dom';

export const changesLoader = async () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  const response = ky.get(url).json();
  return defer({ changes: response });
};

export const pdaToggle = (deckid, isDelete) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/favorite/${deckid}`;
  return ky(url, { method: isDelete ? 'DELETE' : 'POST' });
};
