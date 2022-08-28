import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ButtonIconed, ModalConfirmation } from 'components';
import { useApp } from 'context';
import { byTimestamp } from 'utils';

const DeckDeleteButton = ({ deck, noText }) => {
  const {
    setActiveDeck,
    setDecks,
    decks,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck(deck.deckid);
  };

  let revisions = [];
  if (deck.master) {
    revisions = [deck.master, ...decks[deck.master].branches];
  } else if (deck.branches) {
    revisions = [deck.deckid, ...deck.branches];
  } else {
    revisions = [deck.deckid];
  }

  const getLastDeckExcept = (deckid) => {
    const lastDeckArray = Object.values(decks)
      .filter((deck) => !revisions.includes(deck.deckid))
      .sort(byTimestamp);

    if (lastDeckArray.length > 0) {
      return { src: 'my', deckid: lastDeckArray[0].deckid };
    } else {
      return null;
    }
  };

  const deleteDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options).then(() => {
      setDecks((prevState) => {
        const newState = { ...prevState };
        revisions.map((d) => {
          delete newState[d];
        });
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
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    });
  };

  return (
    <>
      <ButtonIconed
        variant={noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Deck"
        icon={
          <TrashFill
            width={noText ? '18' : '18'}
            height={noText ? '22' : '18'}
            viewBox="0 0 18 16"
          />
        }
        text={noText ? null : 'Delete Deck'}
      />
      <ModalConfirmation
        withConfirmation={revisions.length > 1}
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={`Delete deck "${deck.name} and all its revisions"`}
        mainText="THIS CANNOT BE UNDONE!"
        buttonText="Delete"
      />
    </>
  );
};

export default DeckDeleteButton;
