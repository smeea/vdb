import React from 'react';
import { Button } from 'react-bootstrap';
import DoorClosedFill from 'assets/images/icons/door-closed-fill.svg';
import { useApp } from 'context';

function AccountLogout(props) {
  const { setUsername } = useApp();

  const logoutUser = () => {
    const url = `${process.env.API_URL}logout`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);

    setUsername('');
  };

  return (
    <Button variant="primary" onClick={logoutUser}>
      <DoorClosedFill /> Logout
    </Button>
  );
}

export default AccountLogout;
