import ky from 'ky';

export const submitReport = (id, value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/${isPrecon ? 'precons' : 'cards'}/${id}`;
  return ky.put(url, { json: value }).json();
};

export const changePlaytester = (user, isAdd = true) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  return ky(url, {
    method: isAdd ? 'PUT' : 'DELETE',
    json: { username: user },
  }).json();
};

export const getReports = async (value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${value.Id}`;

  return ky.get(url).json();
};

export const updateProfile = (target, value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/profile`;
  return ky.put(url, { json: { [target]: value } }).json();
};
