import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function AccountChangePassword(props) {
  const [state, setState] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const changePassword = () => {
    if (state.confirmPassword != state.newPassword) {
      return console.log('password do not match');
    }

    const url = process.env.API_URL + 'account';
    let input = {
      password: state.password,
      newPassword: state.newPassword,
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          console.log('changed password');
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  return (
    <>
      <h6>Change password</h6>
      <form>
        <input
          placeholder='Old password'
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
        />
        <input
          placeholder='New password'
          type='password'
          name='newPassword'
          value={state.newPassword}
          onChange={handleChange}
        />
        <input
          placeholder='Confirm password'
          type='password'
          name='confirmPassword'
          value={state.confirmPassword}
          onChange={handleChange}
        />
        <Button variant='outline-secondary' onClick={changePassword}>
          Change
        </Button>
      </form>
    </>
  );
}

export default AccountChangePassword;
