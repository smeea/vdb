import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function AccountChangeName(props) {
  const [state, setState] = useState({
    password: '',
    publicName: props.publicName,
  });


  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const changeName = () => {
    const url = process.env.API_URL + 'account';
    let input = {
      password: state.password,
      publicName: state.publicName,
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
          console.log('public name changed');
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  return (
    <>
      <h6>Change name</h6>
      <form>
        <input
          placeholder='Public name'
          type='text'
          name='publicName'
          value={state.publicName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder='Password'
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
        />

        <Button variant='outline-secondary' onClick={changeName}>
          Change
        </Button>
      </form>
    </>
  );
}

export default AccountChangeName;
