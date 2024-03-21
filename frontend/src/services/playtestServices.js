import { DEFAULT_OPTIONS } from '@/utils/constants';

export const submitReport = (id, value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/${
    isPrecon ? 'precons' : 'cards'
  }/${id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(value),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((response) => {
    if (!response.ok) throw response;
    return response.json();
  });
};

export const changeLang = (value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/lang`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      lang: value,
    }),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((response) => {
    if (!response.ok) throw response;
    return response.json();
  });
};

export const changePlaytester = (user, isAdd = true) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const options = {
    method: isAdd ? 'PUT' : 'DELETE',
    body: JSON.stringify({ username: user }),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((response) => {
    if (!response.ok) throw response;
    return response.json();
  });
};
