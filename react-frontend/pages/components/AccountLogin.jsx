import React, { useRef, useState } from 'react';
import {
  FormControl,
  InputGroup,
  Tooltip,
  Overlay,
  Button,
} from 'react-bootstrap';
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
      <h6 className="d-flex align-items-center">
        <DoorOpenFill />
        <span className="ml-2">Login</span>
      </h6>
      <InputGroup className="mb-2">
        <FormControl
          placeholder="Username"
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        {hidePassword ? (
          <FormControl
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        ) : (
          <FormControl
            placeholder="Password"
            type="text"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        )}
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          <Button variant="outline-secondary" onClick={loginUser}>
            Login
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {emptyUsername && <span className="login-error">Enter username</span>}
      {passwordError && <span className="login-error">Wrong password</span>}
      {emptyPassword && <span className="login-error">Enter password</span>}
      <div
        className="d-inline forgot-password"
        ref={targetForgotPassword}
        onClick={() => setShowForgotPassword(!showForgotPassword)}
      >
        <a href="#">
          <i>Forgot password?</i>
        </a>
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
    </>
  );
}

export default AccountLogin;
