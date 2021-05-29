import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import NodeMinusFill from '../../assets/images/icons/node-minus-fill.svg';
import DeleteConfirmation from './DeleteConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function DeckBranchDelete(props) {
  const { getDecks, setActiveDeck, isMobile } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch();
    setShowConfirmation(false);
    if (props.deck.master) {
      setActiveDeck({ src: 'my', deckid: props.deck.master });
    } else {
      setActiveDeck({ src: 'my', deckid: props.deck.branches[0] });
    }
    isMobile && props.setShowButtons(false);
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
      .then(() => getDecks())
      .then(() => isMobile && props.setShowInfo(true));
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
        block={!props.noText}
      >
        <NodeMinusFill
          width={props.noText ? '16' : '21'}
          height={props.noText ? '16' : '21'}
          viewBox="0 0 16 16"
        />{' '}
        {!props.noText && 'Delete Revision'}
      </Button>
      <DeleteConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        target={`version "${props.deck.branchName}" of deck "${props.deck.name}"`}
      />
    </>
  );
}

export default DeckBranchDelete;
