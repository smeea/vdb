export const changesLoader = async () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = fetch(url, options).then((response) => {
    if (!response.ok) return { error: response.status };
    return response.json();
  });

  return { changes: response };
};
