import React, { useRef, useState } from 'react';
import { Alert, Tooltip, Overlay, Button } from 'react-bootstrap';
import { BrowserRouter as Router, useLocation, useParams, Redirect } from "react-router-dom";
import { DoorOpenFill } from 'react-bootstrap-icons';

function AccountLogin(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const targetForgotPassword = useRef(null);

  const [passwordError, setPasswordError] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const loginUser = () => {
    setPasswordError(false);

    if (state.username && state.password) {
      const url = '/login';
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
        .then(response => {
          if(response.ok) {
            response.json()
          } else {
            throw Error(`Error: ${response.status}`)
          }
        })
        .then(data => {
          props.setUsername(state.username);
        })
        .catch((error) => {
          setPasswordError(true);
          setState(prevState => ({
            ...prevState,
            password: ''
          }));
          console.log(error);
        });
    }
    !state.username ? setEmptyUsername(true) : setEmptyUsername(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  return (
    <>
      <h6><DoorOpenFill />{' '}Login</h6>
      <div className='d-flex'>
        <div>
          <input
            placeholder='Username'
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
        </div>
        <div>
          <input
            placeholder='Password'
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
          />
          { passwordError &&
            <>
              <br />
              <span className='login-error'>
                Wrong password
              </span>
            </>
          }
          { emptyPassword &&
            <>
              <br />
              <span className='login-error'>
                Enter password
              </span>
            </>
          }
          <br />
          <span
            className='forgot-password'
            ref={targetForgotPassword}
            onClick={() => setShowForgotPassword(!showForgotPassword)}
          >
            <a href='#'><i>Forgot password?</i></a>
          </span>
          <Overlay
            target={targetForgotPassword.current}
            placement='right'
            show={showForgotPassword}
          >
            {(props) => (
              <Tooltip id='tooltip-forgot' {...props}>
                We do not have automatic password restoration yet, please
                {' '}<a href='mailto:smeea@riseup.net'>send me an email</a>{' '}
                with your account username and I will generate temporary password for you.
              </Tooltip>
            )}
          </Overlay>
        </div>
        <Button variant='outline-secondary' onClick={loginUser}>
          Login
        </Button>
      </div>
    </>
  );
}

export default AccountLogin;
