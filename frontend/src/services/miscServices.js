const DEFAULT_OPTIONS = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const changesLoader = () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  const options = {
    method: 'GET',
  };

  const response = fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(
    (response) => {
      if (!response.ok) return { error: response.status };
      return response.json();
    }
  );

  return { changes: response };
};

export const changePlaytester = (user, isAdd = true) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest`;
  const options = {
    method: isAdd ? 'PUT' : 'DELETE',
    body: JSON.stringify({ username: user }),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};

export const pdaToggle = (deckid, isDelete) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/favorite/${deckid}`;
  const options = {
    method: isDelete ? 'DELETE' : 'POST',
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};
