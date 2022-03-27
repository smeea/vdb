import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckDeleteButton = (props) => {
  const { getDecks, setActiveDeck, isMobile } = useApp();
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
      <ButtonIconed
        variant={props.noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Deck"
        icon={
          <TrashFill
            width={props.noText ? '18' : '18'}
            height={props.noText ? '22' : '18'}
            viewBox="0 0 18 16"
          />
        }
        text={!props.noText && 'Delete Deck'}
      />
      <ModalConfirmation
        withConfirmation={
          props.deck.master ||
          (props.deck.branches && props.deck.branches.length)
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
};

export default DeckDeleteButton;
