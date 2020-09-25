import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

import DeckRemoveDeckConfirmation from './DeckRemoveDeckConfirmation.jsx';

function DeckRemoveDeck(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    removeDeck();
    setShowConfirmation(false);
    props.setActiveDeck(undefined);
  }

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
        body: JSON.stringify({deckid: props.deck.deckid}),
      };
      fetch(url, options);
      console.log('Remove deck: ', props.deck.deckid);

    } else {
      console.log('Error: no deck selected');
    };
  };

  return (
    <>
      <Button variant='outline-secondary' onClick={() => setShowConfirmation(true)}>
        <TrashFill/>{' '}Remove
      </Button>
      <DeckRemoveDeckConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        deckname={props.deck.name}
      />
    </>
  );
}

export default DeckRemoveDeck;
