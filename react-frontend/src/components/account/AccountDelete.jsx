import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { AccountDeleteConfirmation } from 'components';

function AccountDelete(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setShowConfirmation(true)}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="pe-2">
            <TrashFill />
          </div>
          Delete account
        </div>
      </Button>
      <AccountDeleteConfirmation
        show={showConfirmation}
        setShow={setShowConfirmation}
      />
    </>
  );
}

export default AccountDelete;
