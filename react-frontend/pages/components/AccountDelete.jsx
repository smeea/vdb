import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import AccountDeleteConfirmation from './AccountDeleteConfirmation.jsx';

function AccountDelete(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setShowConfirmation(true)}>
        <TrashFill />
        <span className="ms-1">Delete account</span>
      </Button>
      <AccountDeleteConfirmation
        show={showConfirmation}
        setShow={setShowConfirmation}
      />
    </>
  );
}

export default AccountDelete;
