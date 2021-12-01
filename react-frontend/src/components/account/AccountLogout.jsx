import React from 'react';
import { Button } from 'react-bootstrap';
import DoorClosedFill from 'assets/images/icons/door-closed-fill.svg';
import { useApp } from 'context';
import { userServices } from 'services';

function AccountLogout(props) {
  const { setUsername } = useApp();

  const logoutUser = () => {
    setUsername(undefined);
    userServices.logout();
  };

  return (
    <Button variant="primary" onClick={logoutUser}>
      <DoorClosedFill /> Logout
    </Button>
  );
}

export default AccountLogout;
