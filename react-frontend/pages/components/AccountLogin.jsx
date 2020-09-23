import React, { useRef, useState } from 'react';
import { Tooltip, Overlay, Button } from 'react-bootstrap';

function AccountLogin(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const targetForgotPassword = useRef(null);

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          props.setUsername(state.username);
        } else {
          console.log('error: ', data.error);
        }
      });
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
              with your account username I will generate new password for you.
            </Tooltip>
          )}
        </Overlay>
      </form>
    </>
  );
}

export default AccountLogin;
