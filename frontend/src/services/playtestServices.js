import ky from 'ky';

export const submitReport = (id, value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/${isPrecon ? 'precons' : 'cards'}/${id}`;
  return ky.put(url, { json: value }).json();
};

export const changeLang = (value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/lang`;
  return ky.put(url, { json: { lang: value } }).json();
};

export const changePlaytester = (user, isAdd = true) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const options = {
    body: JSON.stringify({ username: user }),
  };

  return ky(url, {
    method: isAdd ? 'PUT' : 'DELETE',
    json: { username: user },
  }).json();
};

export const getReports = async (value, isPrecon) => {
  const options = {};
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${value.Id}`;

  return ky.get(url).json();
};
