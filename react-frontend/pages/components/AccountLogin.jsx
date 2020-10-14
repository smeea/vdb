import React, { useRef, useState } from 'react';
import { Tooltip, Overlay, Button } from 'react-bootstrap';
import DoorOpenFill from '../../assets/images/icons/door-open-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';

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
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = () => {
    setPasswordError(false);

    if (state.username && state.password) {
      setEmptyUsername(false);
      setEmptyPassword(false);

      const url = `${process.env.API_URL}login`;
      const input = {
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
        .then((response) => {
          if (response.ok) {
            response.json();
          } else {
            throw Error(`Error: ${response.status}`);
          }
        })
        .then((data) => {
          props.setUsername(state.username);
        })
        .catch((error) => {
          setPasswordError(true);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
          console.log(error);
        });
    }
    !state.username ? setEmptyUsername(true) : setEmptyUsername(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  return (
    <>
      <h6>
        <DoorOpenFill /> Login
      </h6>
      <div className="d-flex">
        <div>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          {emptyUsername && (
            <div>
              <span className="login-error">Enter username</span>
            </div>
          )}
        </div>
        <div>
          <div className="d-flex align-items-center">
            {hidePassword ? (
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            ) : (
              <input
                placeholder="Password"
                type="text"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            )}
            <span
              className="password-hide-show"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeFill /> : <EyeSlashFill />}
            </span>
          </div>
          {passwordError && <span className="login-error">Wrong password</span>}
          {emptyPassword && <span className="login-error">Enter password</span>}
          <div
            className="forgot-password"
            ref={targetForgotPassword}
            onClick={() => setShowForgotPassword(!showForgotPassword)}
          >
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </div>
          <Overlay
            target={targetForgotPassword.current}
            placement="bottom"
            show={showForgotPassword}
          >
            {(props) => (
              <Tooltip id="tooltip-forgot" {...props}>
                We do not have automatic password restoration yet, please{' '}
                <a href="mailto:smeea@riseup.net">send me an email</a> with your
                account username and I will generate temporary password for you.
              </Tooltip>
            )}
          </Overlay>
        </div>
        <Button variant="outline-secondary" onClick={loginUser}>
          Login
        </Button>
      </div>
    </>
  );
}

export default AccountLogin;
