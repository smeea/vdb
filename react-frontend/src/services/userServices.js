const loginUrl = `${process.env.API_URL}login`;
const registerUrl = `${process.env.API_URL}register`;
const changeAccountUrl = `${process.env.API_URL}account`;
const logoutUrl = `${process.env.API_URL}logout`;
const deleteUrl = `${process.env.API_URL}account/remove`;

export const login = (
  username,
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const body = {
    username: username,
    password: password,
    remember: 'True',
  };

  fetchWithCallbacks(loginUrl, defaultOption(body), onSuccess, onError);
};

export const register = (
  username,
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const body = {
    username: username,
    password: password,
  };

  fetchWithCallbacks(registerUrl, defaultOption(body), onSuccess, onError);
};

export const changePassword = (
  password,
  newPassword,
  onSuccess = () => {},
  onError = () => {}
) => {
  const body = {
    password: password,
    newPassword: newPassword,
  };

  fetchWithCallbacks(changeAccountUrl, defaultOption(body), onSuccess, onError);
};

export const changeEmail = (
  password,
  email,
  onSuccess = () => {},
  onError = () => {}
) => {
  const body = {
    password: password,
    email: email,
  };

  fetchWithCallbacks(changeAccountUrl, defaultOption(body), onSuccess, onError);
};

export const changeName = (
  publicName,
  onSuccess = () => {},
  onError = () => {}
) => {
  const body = {
    publicName: publicName,
  };

  fetchWithCallbacks(changeAccountUrl, defaultOption(body), onSuccess, onError);
};

export const deleteAccount = (
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const body = {
    password: password,
  };

  fetchWithCallbacks(deleteUrl, defaultOption(body), onSuccess, onError);
};

export const logout = () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };
  fetch(logoutUrl, options);
};

// prebuilded options
const defaultOption = (body) => {
  return {
    method: 'POST',
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
