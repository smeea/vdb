const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  mode: 'cors',
  credentials: 'include',
};

export const submitReport = (cardid, value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/cards/${cardid}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(value),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((response) => {
    if (!response.ok) throw response;
    return response.json();
  });
};
