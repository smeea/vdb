import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function AccountLogin(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const logoutUser = () => {
    console.log('submit logout button');

    const url = process.env.API_URL + 'logout';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);

    props.setUsername(undefined);
  };

  const loginUser = () => {
    const url = process.env.API_URL + 'login';
    let input = {
      username: state.username,
      password: state.password,
      remember: 'True',
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
      .then(response => response.json());

    props.setUsername(state.username);
  };

  return (
    <>
      <h6>Login</h6>
      <form>
        <input
          placeholder='Username'
          type='text'
          name='username'
          value={state.username}
          onChange={handleChange}
        />
        <input
          placeholder='Password'
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
        />
        <Button variant='outline-secondary' onClick={loginUser}>
          Login
        </Button>
        <Button variant='outline-secondary' onClick={logoutUser}>
          Logout
        </Button>
      </form>
    </>
  );
}

export default AccountLogin;
