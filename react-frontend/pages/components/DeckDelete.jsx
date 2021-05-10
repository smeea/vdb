import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import DeleteConfirmation from './DeleteConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function DeckDelete(props) {
  const { isMobile } = useContext(AppContext);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck();
    setShowConfirmation(false);
    props.setActiveDeck({ src: null, deckid: null });
    props.history.push('/decks');
    isMobile && props.setShowButtons(false);
  };

  const deleteDeck = () => {
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
        target={`deck "${props.deck.name}" and all its versions`}
      />
    </>
  );
}

export default DeckDelete;
