import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import ModalConfirmation from './ModalConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function DeckDelete(props) {
  const { getDecks, setActiveDeck, isMobile } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck();
    setShowConfirmation(false);
    setActiveDeck({ src: null, deckid: null });
    navigate('/decks');
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
    fetch(url, options).then(() => getDecks());
  };

  return (
    <>
      <Button
        title="Delete Deck"
        variant={props.noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className={props.noText ? null : 'pe-2'}>
            <TrashFill />
          </div>
          {!props.noText && 'Delete Deck'}
        </div>
      </Button>
      <ModalConfirmation
        withConfirmation={
          props.deck.master ||
          (props.deck.brachnes && props.deck.branches.length)
            ? true
            : false
        }
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={`Delete deck "${props.deck.name} and all its revisions"`}
        mainText="THIS CANNOT BE UNDONE!"
        buttonText="Delete"
      />
    </>
  );
}

export default DeckDelete;
