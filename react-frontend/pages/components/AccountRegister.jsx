import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function AccountRegister(props){
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registerUser = () => {
    const url = 'http://127.0.0.1:5001/api/register';
    let input = {
      username: state.username,
      email: state.email,
      password: state.password,
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
      <h6>Register</h6>
      <form>
        <input
          placeholder='Username'
          type='text'
          name='username'
          value={state.username}
          onChange={handleChange}
        />
        <input
          placeholder='Email'
          type='text'
          name='email'
          value={state.email}
          onChange={handleChange}
        />
        <input
          placeholder='Password'
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
        />
        <Button variant='outline-primary' onClick={registerUser}>
          Register
        </Button>
      </form>
    </>
  );
}

export default AccountRegister;
