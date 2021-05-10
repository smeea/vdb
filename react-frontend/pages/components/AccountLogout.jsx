import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import DoorClosedFill from '../../assets/images/icons/door-closed-fill.svg';
import AppContext from '../../context/AppContext';

function AccountLogout(props) {
  const { setUsername } = useContext(AppContext);

  const logoutUser = () => {
    const url = `${process.env.API_URL}logout`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);

    setUsername(undefined);
  };

  return (
    <Button variant="outline-secondary" onClick={logoutUser}>
      <DoorClosedFill /> Logout
    </Button>
  );
}

export default AccountLogout;
