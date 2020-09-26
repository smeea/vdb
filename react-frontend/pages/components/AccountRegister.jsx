import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { PersonPlusFill } from 'react-bootstrap-icons';

function AccountRegister(props){
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [usernameError, setUsernameError] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registerUser = () => {
    setUsernameError(false);

    if (state.username && state.password) {
      const url = process.env.API_URL + 'register';
      let input = {
        username: state.username,
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
        .then(response => response.json())
        .then(data => {
          props.setUsername(state.username);
        })
        .catch((error) => {
          setUsernameError(true);
          setState(prevState => ({
            ...prevState,
            username: '',
          }));
          console.log(error);
        });
    }
    !state.username ? setEmptyUsername(true) : setEmptyUsername(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  return (
    <>
      <h6><PersonPlusFill />{' '}Create Account</h6>
      <div className='d-flex'>
        <div>
          <input
            placeholder='New Username'
            type='text'
            name='username'
            value={state.username}
            onChange={handleChange}
          />
          { emptyUsername &&
            <>
              <br />
              <span className='login-error'>
                Enter username
              </span>
            </>
          }
          { usernameError &&
            <>
              <br />
              <span className='login-error'>
                This username is taken
              </span>
            </>
          }
        </div>
        <div>
          <input
            placeholder='Password'
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
          />
          { emptyPassword &&
            <>
              <br />
              <span className='login-error'>
                Enter password
              </span>
            </>
          }
        </div>
        <Button variant='outline-secondary' onClick={registerUser}>
          Create
        </Button>
      </div>
    </>
  );
}

export default AccountRegister;
