import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckDeleteButton = (props) => {
  const { setActiveDeck, setDecks, isMobile, decks } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck(props.deck.deckid);
  };

  const getLastDeckExcept = (deckid) => {
    const byTimestamp = (a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    };

    const lastDeckArray = Object.values(decks)
      .filter((deck) => deck.deckid !== deckid)
      .sort(byTimestamp);

    if (lastDeckArray.length > 0) {
      return { src: 'my', deckid: lastDeckArray[0].deckid };
    } else {
      return null;
    }
  };

  const deleteDeck = (deckid) => {
    const url = `${process.env.API_URL}decks/remove`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckid: deckid }),
    };

    fetch(url, options).then(() => {
      setDecks((prevState) => {
        const newState = { ...prevState };
        delete newState[deckid];
        return newState;
      });

      const lastDeck = getLastDeckExcept(deckid);
      if (lastDeck) {
        setActiveDeck(lastDeck);
      } else {
        setActiveDeck({ src: null, deckid: null });
        navigate('/decks');
      }
      setShowConfirmation(false);
      isMobile && props.setShowButtons(false);
    });
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
