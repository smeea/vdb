import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import AccountRemoveConfirmation from './AccountRemoveConfirmation.jsx';

function AccountRemoveAccount(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState(undefined);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    removeAccount();
    setShowConfirmation(false);
    props.setUsername(undefined);
  }

  const handleChange = event => setPassword(event.target.value);

  const removeAccount = () => {
    const url = process.env.API_URL + 'account/remove';
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password
      }),
    };
    fetch(url, options);
    console.log('Remove account: ', props.username);
  };

  return (
    <>
      <h6>Remove account</h6>
      <Button variant='outline-secondary' onClick={() => setShowConfirmation(true)}>
        Remove Account
      </Button>
      <AccountRemoveConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        password={password}
        handleChange={handleChange}
        username={props.username}
      />
    </>
  );
}

export default AccountRemoveAccount;
