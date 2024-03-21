import { DEFAULT_OPTIONS } from '@/utils/constants';
const accountUrl = `${import.meta.env.VITE_API_URL}/account`;
const loginUrl = `${import.meta.env.VITE_API_URL}/login`;

export const login = (
  username,
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
      remember: 'True',
    }),
  };

  fetchWithCallbacks(
    loginUrl,
    { ...DEFAULT_OPTIONS, ...options },
    onSuccess,
    onError
  );
};

export const whoAmI = () => {
  const url = `${import.meta.env.VITE_API_URL}/account`;
  const options = {};

  return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((response) => {
    if (!response.ok) return { error: response.status };
    return response.json();
  });
};

export const logout = () => {
  const options = {
    method: 'DELETE',
  };
  fetch(loginUrl, { ...DEFAULT_OPTIONS, ...options });
};

export const register = (
  username,
  password,
  email,
  onSuccess = () => {},
  onError = () => {}
) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  };

  fetchWithCallbacks(
    accountUrl,
    { ...DEFAULT_OPTIONS, ...options },
    onSuccess,
    onError
  );
};

export const changePassword = (
  password,
  newPassword,
  onSuccess = () => {},
  onError = () => {}
) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      password: password,
      newPassword: newPassword,
    }),
  };

  fetchWithCallbacks(
    accountUrl,
    { ...DEFAULT_OPTIONS, ...options },
    onSuccess,
    onError
  );
};

export const changeEmail = (
  password,
  email,
  onSuccess = () => {},
  onError = () => {}
) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  };

  fetchWithCallbacks(
    accountUrl,
    { ...DEFAULT_OPTIONS, ...options },
    onSuccess,
    onError
  );
};

export const changeName = (
  publicName,
  onSuccess = () => {},
  onError = () => {}
) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      publicName: publicName,
    }),
  };

  fetchWithCallbacks(
    accountUrl,
    { ...DEFAULT_OPTIONS, ...options },
    onSuccess,
    onError
  );
};

export const deleteAccount = (
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const options = {
    method: 'DELETE',
    body: JSON.stringify({
      password: password,
    }),
  };

  fetchWithCallbacks(
    accountUrl,
    { ...DEFAULT_OPTIONS, ...options },
    onSuccess,
    onError
  );
};

// Performs a fetch and call onSuccess or onError callbacks
const fetchWithCallbacks = (
  url,
  options,
  onSuccessCallBack,
  onErrorCallBack
) => {
  fetch(url, options)
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      onSuccessCallBack(data);
    })
    .catch((e) => {
      onErrorCallBack(e);
    });
};
