import { DEFAULT_OPTIONS } from '@/utils/constants';

export const changesLoader = () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  const options = {};

  const response = fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(
    (response) => {
      if (!response.ok) return { error: response.status };
      return response.json();
    },
  );

  return { changes: response };
};

export const pdaToggle = (deckid, isDelete) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/favorite/${deckid}`;
  const options = {
    method: isDelete ? 'DELETE' : 'POST',
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};
