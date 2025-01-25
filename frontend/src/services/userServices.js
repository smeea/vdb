import ky from 'ky';
const ACCOUNT_URL = `${import.meta.env.VITE_API_URL}/account`;
const LOGIN_URL = `${import.meta.env.VITE_API_URL}/login`;
import { ERROR, USERNAME, PASSWORD, NEW_PASSWORD, REMEMBER, EMAIL, PUBLIC_NAME } from '@/constants';

export const login = (username, password) => {
  const options = {
    method: 'POST',
    json: {
      [USERNAME]: username,
      [PASSWORD]: password,
      [REMEMBER]: 'True',
    },
  };

  return ky(LOGIN_URL, options)
    .then((data) => data.json())
    .catch((e) => {
      return { [ERROR]: e?.response.status };
    });
};

export const whoAmI = () => {
  return ky.get(ACCOUNT_URL).json();
};

export const logout = () => ky.delete(LOGIN_URL);

export const register = (username, password, email) => {
  const options = {
    method: 'POST',
    json: {
      [USERNAME]: username,
      [EMAIL]: email,
      [PASSWORD]: password,
    },
  };

  return ky(ACCOUNT_URL, options)
    .then((data) => data.json())
    .catch((e) => {
      return { [ERROR]: e?.response.status };
    });
};

export const changePassword = (password, newPassword) => {
  const options = {
    method: 'PUT',
    json: {
      [PASSWORD]: password,
      [NEW_PASSWORD]: newPassword,
    },
  };

  return ky(ACCOUNT_URL, options)
    .then((data) => data.json())
    .catch((e) => {
      return { [ERROR]: e?.response.status };
    });
};

export const changeEmail = async (password, email) => {
  const options = {
    method: 'PUT',
    json: {
      [PASSWORD]: password,
      [EMAIL]: email,
    },
  };

  return ky(ACCOUNT_URL, options)
    .then((data) => data.json())
    .catch((e) => {
      return { [ERROR]: e?.response.status };
    });
};

export const changeName = (publicName) => {
  const options = {
    method: 'PUT',
    json: { [PUBLIC_NAME]: publicName },
  };

  return ky(ACCOUNT_URL, options)
    .then((data) => data.json())
    .catch((e) => {
      return { [ERROR]: e?.response.status };
    });
};

export const deleteAccount = (password) => {
  const options = {
    method: 'DELETE',
    json: { [PASSWORD]: password },
  };

  return ky(ACCOUNT_URL, options)
    .then((data) => data.json())
    .catch((e) => {
      return { [ERROR]: e?.response.status };
    });
};
