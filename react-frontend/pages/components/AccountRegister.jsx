import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import PersonPlusFill from '../../assets/images/icons/person-plus-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';

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

      const url = `${process.env.API_URL}register`;
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
        <span className="ml-1">
          Create account
        </span>
      </h6>
      <InputGroup className="mb-2">
        <FormControl
          placeholder="New Username"
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
          <Button variant="outline-secondary"
                  onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          <Button variant="outline-secondary" onClick={registerUser}>
            Create
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {emptyUsername && (
        <div>
          <span className="login-error">Enter username</span>
        </div>
      )}
      {usernameError && (
        <div>
          <span className="login-error">This username is taken</span>
        </div>
      )}
      {emptyPassword && <span className="login-error">Enter password</span>}
    </>
  );
}

export default AccountRegister;
