export const changesLoader = () => {
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

export const changePlaytester = (user, isAdd = true) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest`;
  const options = {
    method: isAdd ? 'PUT' : 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: user }),
  };

  return fetch(url, options);
};
