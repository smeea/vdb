import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';

import AccountDeleteConfirmation from './AccountDeleteConfirmation.jsx';
import OverlayTooltip from './OverlayTooltip.jsx';

function AccountDelete(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => setShowConfirmation(true)}
      >
        <TrashFill />
        <span className="ml-1">Delete account</span>
      </Button>
      <AccountDeleteConfirmation
        show={showConfirmation}
        setShow={setShowConfirmation}
        username={props.username}
        setUsername={props.setUsername}
      />
    </>
  );
}

export default AccountDelete;
