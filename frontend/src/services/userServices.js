import ky from 'ky';
const ACCOUNT_URL = `${import.meta.env.VITE_API_URL}/account`;
const LOGIN_URL = `${import.meta.env.VITE_API_URL}/login`;
import { USERNAME, PASSWORD, NEW_PASSWORD, REMEMBER, EMAIL, PUBLIC_NAME } from '@/constants';

export const login = (username, password, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'POST',
    json: {
      [USERNAME]: username,
      [PASSWORD]: password,
      [REMEMBER]: 'True',
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
      [USERNAME]: username,
      [EMAIL]: email,
      [PASSWORD]: password,
    },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const changePassword = (password, newPassword, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'PUT',
    json: {
      [PASSWORD]: password,
      [NEW_PASSWORD]: newPassword,
    },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const changeEmail = (password, email, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'PUT',
    json: {
      [PASSWORD]: password,
      [EMAIL]: email,
    },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const changeName = (publicName, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'PUT',
    json: { [PUBLIC_NAME]: publicName },
  };

  fetchWithCallbacks(ACCOUNT_URL, options, onSuccess, onError);
};

export const deleteAccount = (password, onSuccess = () => {}, onError = () => {}) => {
  const options = {
    method: 'DELETE',
    json: { [PASSWORD]: password },
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
