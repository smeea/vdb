import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';

import DeckRemoveConfirmation from './DeckRemoveConfirmation.jsx';

function DeckRemove(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    removeDeck();
    setShowConfirmation(false);
    props.setActiveDeck(undefined);
  };

  const removeDeck = () => {
    if (props.deck) {
      const url = process.env.API_URL + 'decks/remove';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deckid: props.deck.deckid }),
      };
      fetch(url, options);
      console.log('Remove deck: ', props.deck.deckid);
    } else {
      console.log('Error: no deck selected');
    }
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
      >
        <TrashFill /> Remove Deck
      </Button>
      <DeckRemoveConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        deckname={props.deck.name}
      />
    </>
  );
}

export default DeckRemove;
