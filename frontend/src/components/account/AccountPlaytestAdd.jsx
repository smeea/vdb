import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import { ErrorOverlay } from 'components';

const AccountPlaytestAdd = ({
  playtesters,
  newPlaytesters,
  setNewPlaytesters,
}) => {
  const [username, setUsername] = useState('');
  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const addPlaytester = () => {
    setSpinnerState(true);

    const url = `${process.env.API_URL}playtest`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    };

    setError(false);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(() => {
        if (
          !newPlaytesters.includes(username) &&
          !playtesters.includes(username)
        ) {
          setNewPlaytesters([...newPlaytesters, username]);
          setUsername('');
        } else {
          setError('ALREADY PLAYTESTER');
        }
      })
      .catch(() => {
        setError('USER DOES NOT EXIST');
      });

    setSpinnerState(false);
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) addPlaytester();
  };

  return (
    <Form className="mb-0" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          placeholder="Add Playtester (login)"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          ref={ref}
        />
        {!spinnerState ? (
          <Button variant="primary" type="submit">
            <Check2 />
          </Button>
        ) : (
          <Button variant="primary">
            <Spinner animation="border" size="sm" />
          </Button>
        )}
      </InputGroup>
      <ErrorOverlay show={error} target={ref.current} placement="bottom">
        {error}
      </ErrorOverlay>
    </Form>
  );
};

export default AccountPlaytestAdd;
