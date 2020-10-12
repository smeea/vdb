import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';

import AccountRemoveConfirmation from './AccountRemoveConfirmation.jsx';
import OverlayTooltip from './OverlayTooltip.jsx';

function AccountRemove(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <h6 className="d-flex align-items-center">
        <TrashFill />
        <span className="ml-1">Remove account</span>
        <OverlayTooltip text="This will also remove all your decks and they will not be available via URL anymore.">
          <span className="question-tooltip ml-1">[?]</span>
        </OverlayTooltip>
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
