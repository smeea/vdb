import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function AccountRegister(props){
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = event => {
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
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
      .then(result => result.json());

    props.updateUsername(state.username);
  };

  return (
    <React.Fragment>
      <h6>Register</h6>
      <form>
        <input
          placeholder='Username'
          type='text'
          name='username'
          id='username'
          value={state.username}
          onChange={handleChange}
        />
        <input
          placeholder='Email'
          type='text'
          name='email'
          id='email'
          value={state.email}
          onChange={handleChange}
        />
        <input
          placeholder='Password'
          type='text'
          name='password'
          id='password'
          value={state.password}
          onChange={handleChange}
        />
        <Button variant='outline-primary' onClick={registerUser}>
          Register
        </Button>
      </form>
    </React.Fragment>
  );
}

export default AccountRegister;
