import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { EnvelopeFill } from 'react-bootstrap-icons';

function AccountChangeEmail(props) {
  const [state, setState] = useState({
    password: '',
    email: '',
  });

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeEmail = () => {
    setPasswordError(false);

    if (state.email && state.password) {
      setEmptyEmail(false);
      setEmptyPassword(false);

      const url = process.env.API_URL + 'account';
      const input = {
        password: state.password,
        email: state.email,
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
          props.setEmail(state.email);
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

    !state.email ? setEmptyEmail(true) : setEmptyEmail(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  return (
    <>
      <h6>
        <EnvelopeFill /> Change email
      </h6>
      <div className="d-flex">
        <div>
          <input
            placeholder="New email"
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          {emptyEmail && (
            <>
              <br />
              <span className="login-error">Enter email</span>
            </>
          )}
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          {emptyPassword && (
            <>
              <br />
              <span className="login-error">Enter password</span>
            </>
          )}
          {passwordError && (
            <>
              <br />
              <span className="login-error">Wrong password</span>
            </>
          )}
        </div>
        <Button variant="outline-secondary" onClick={changeEmail}>
          Change
        </Button>
      </div>
    </>
  );
}

export default AccountChangeEmail;
