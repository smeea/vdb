import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { EnvelopeFill } from 'react-bootstrap-icons';

function AccountChangeEmail(props) {
  const [state, setState] = useState({
    password: '',
    newEmail: '',
    confirmEmail: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeEmail = () => {
    if (state.confirmEmail != state.newEmail) {
      return console.log('email do not match');
    }

    const url = process.env.API_URL + 'account';
    const input = {
      password: state.password,
      newEmail: state.newEmail,
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
        if (data.error === undefined) {
          console.log('email password');
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  return (
    <>
      <h6>
        <EnvelopeFill />
        Change email
      </h6>
      <form>
        <input
          placeholder="New email"
          type="text"
          name="newEmail"
          value={state.newEmail}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Confirm email"
          type="text"
          name="confirmEmail"
          value={state.confirmEmail}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <Button variant="outline-secondary" onClick={changeEmail}>
          Change
        </Button>
      </form>
    </>
  );
}

export default AccountChangeEmail;
