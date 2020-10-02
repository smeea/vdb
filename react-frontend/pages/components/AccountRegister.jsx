import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { PersonPlusFill, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

function AccountRegister(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [usernameError, setUsernameError] = useState(false);
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

  const registerUser = () => {
    setUsernameError(false);

    if (state.username && state.password) {
      setEmptyUsername(false);
      setEmptyPassword(false);

      const url = process.env.API_URL + 'register';
      const input = {
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
        .then((response) => response.json())
        .then((data) => {
          props.setUsername(state.username);
        })
        .catch((error) => {
          setUsernameError(true);
          setState((prevState) => ({
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
      <h6 className="d-flex align-items-center">
        <PersonPlusFill />
        <span className="ml-1">Create account</span>
      </h6>
      <div className="d-flex">
        <div>
          <input
            placeholder="New Username"
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          {emptyUsername && (
            <>
              <br />
              <span className="login-error">Enter username</span>
            </>
          )}
          {usernameError && (
            <>
              <br />
              <span className="login-error">This username is taken</span>
            </>
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
          {emptyPassword && <span className="login-error">Enter password</span>}
        </div>
        <Button variant="outline-secondary" onClick={registerUser}>
          Create
        </Button>
      </div>
    </>
  );
}

export default AccountRegister;
