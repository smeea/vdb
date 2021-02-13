import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import DeleteConfirmation from './DeleteConfirmation.jsx';

function DeckDelete(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck();
    setShowConfirmation(false);
    props.setActiveDeck(undefined);
    props.setShowButtons(false);
  };

  const deleteDeck = () => {
    if (props.deck) {
      const url = `${process.env.API_URL}decks/remove`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deckid: props.deck.deckid }),
      };
      fetch(url, options).then(() => props.getDecks());
    }
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
        block
      >
        <TrashFill /> Delete Deck
      </Button>
      <DeleteConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        target={`"${props.deck.name}"`}
        isMobile={props.isMobile}
      />
    </>
  );
}

export default DeckDelete;
