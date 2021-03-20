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
    if (props.deck.master) {
      props.setActiveDeck({ src: 'my', deckid: props.deck.master });
    } else {
      props.setActiveDeck({ src: 'my', deckid: props.deck.branches[0] });
    }
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
        <NodeMinusFill width="21" height="21" viewBox="0 0 16 16" /> Delete Revision
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
