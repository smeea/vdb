import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

import AccountRemoveConfirmation from './AccountRemoveConfirmation.jsx';

function AccountRemove(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <h6>
        <TrashFill />
        Remove account
      </h6>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
      >
        Remove Account
      </Button>
      <AccountRemoveConfirmation
        show={showConfirmation}
        setShow={setShowConfirmation}
        username={props.username}
        setUsername={props.setUsername}
      />
    </>
  );
}

export default AccountRemove;
