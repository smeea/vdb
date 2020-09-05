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

    const url = 'http://127.0.0.1:5001/api/logout';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);
    props.updateUsername(undefined);
  };

  const loginUser = () => {
    const url = 'http://127.0.0.1:5001/api/login';
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

    props.updateUsername(state.username);
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
        <Button variant='outline-primary' onClick={loginUser}>
          Login
        </Button>
        <Button variant='outline-primary' onClick={logoutUser}>
          Logout
        </Button>
      </form>
    </>
  );
}

export default AccountLogin;
