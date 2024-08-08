import ky from 'ky';
const ACCOUNT_URL = `${import.meta.env.VITE_API_URL}/account`;
const LOGIN_URL = `${import.meta.env.VITE_API_URL}/login`;

export const login = (username, password, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'POST',
    json: {
      username: username,
      password: password,
      remember: 'True',
    },
  };

  fetchWithCallbacks(LOGIN_URL, options, onSuccess, onError);
};

export const whoAmI = () => {
  const url = `${import.meta.env.VITE_API_URL}/account`;
  return ky.get(url).json();
};

export const logout = () => ky.delete(LOGIN_URL);

export const register = (username, password, email, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'POST',
    json: {
      username: username,
      email: email,
      password: password,
    },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const changePassword = (password, newPassword, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'PUT',
    json: {
      password: password,
      newPassword: newPassword,
    },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const changeEmail = (password, email, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'PUT',
    json: {
      password: password,
      email: email,
    },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const changeName = (publicName, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'PUT',
    json: { publicName: publicName },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const deleteAccount = (password, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'DELETE',
    json: { password: password },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

const fetchWithCallbacks = async (url, options, onSuccessCallBack, onErrorCallBack) => {
  try {
    await ky(url, options)
      .json()
      .then((data) => onSuccessCallBack(data));
  } catch (e) {
    if (e.name === 'HTTPError') {
      const error = await e.response;
      onErrorCallBack(error);
    }
  }
};
