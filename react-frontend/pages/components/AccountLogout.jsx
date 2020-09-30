import React from 'react';
import { Button } from 'react-bootstrap';
import { DoorClosedFill } from 'react-bootstrap-icons';

function AccountLogout(props) {
  const logoutUser = () => {
    console.log('submit logout button');

    const url = '/logout';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);

    props.setUsername(undefined);
  };

  return (
    <Button variant='outline-secondary' onClick={logoutUser}>
      <DoorClosedFill />{' '}Logout
    </Button>
  );
}

export default AccountLogout;
