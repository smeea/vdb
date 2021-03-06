import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import NodeMinusFill from '../../assets/images/icons/node-minus-fill.svg';
import DeleteConfirmation from './DeleteConfirmation.jsx';

function DeckBranchDelete(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch();
    setShowConfirmation(false);
    props.setActiveDeck({ src: null, deckid: null });
    props.setShowButtons(false);
  };

  const deleteBranch = () => {
    const url = `${process.env.API_URL}branch/remove`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckid: props.deck.deckid }),
    };
    fetch(url, options)
      .then(() => props.getDecks())
      .then(() => props.isMobile && props.setShowInfo(true));
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
        block
      >
        <NodeMinusFill /> Delete Revision
      </Button>
      <DeleteConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        target={`version "${props.deck.branchName}" of deck "${props.deck.name}"`}
        isMobile={props.isMobile}
      />
    </>
  );
}

export default DeckBranchDelete;
