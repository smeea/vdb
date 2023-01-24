const accountUrl = `${import.meta.env.VITE_API_URL}/account`;
const loginUrl = `${import.meta.env.VITE_API_URL}/login`;

export const login = (
  username,
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const method = 'POST';
  const body = {
    username: username,
    password: password,
    remember: 'True',
  };

  fetchWithCallbacks(loginUrl, defaultOption(body, method), onSuccess, onError);
};

export const logout = () => {
  const options = {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
  };
  fetch(loginUrl, options);
};

export const register = (
  username,
  password,
  email,
  onSuccess = () => {},
  onError = () => {}
) => {
  const method = 'POST';
  const body = {
    username: username,
    email: email,
    password: password,
  };

  fetchWithCallbacks(
    accountUrl,
    defaultOption(body, method),
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
  const method = 'PUT';
  const body = {
    password: password,
    newPassword: newPassword,
  };

  fetchWithCallbacks(
    accountUrl,
    defaultOption(body, method),
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
  const method = 'PUT';
  const body = {
    password: password,
    email: email,
  };

  fetchWithCallbacks(
    accountUrl,
    defaultOption(body, method),
    onSuccess,
    onError
  );
};

export const changeName = (
  publicName,
  onSuccess = () => {},
  onError = () => {}
) => {
  const method = 'PUT';
  const body = {
    publicName: publicName,
  };

  fetchWithCallbacks(
    accountUrl,
    defaultOption(body, method),
    onSuccess,
    onError
  );
};

export const deleteAccount = (
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const method = 'DELETE';
  const body = {
    password: password,
  };

  fetchWithCallbacks(
    accountUrl,
    defaultOption(body, method),
    onSuccess,
    onError
  );
};

// prebuilded options
const defaultOption = (body, method) => {
  return {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
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
