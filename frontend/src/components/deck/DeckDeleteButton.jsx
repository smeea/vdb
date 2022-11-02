import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ButtonIconed, ModalConfirmation } from 'components';
import { deckStore, setDeck, useApp } from 'context';
import { byTimestamp } from 'utils';

const DeckDeleteButton = ({ deck, noText }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck();
  };

  let revisions = [];
  if (deck.master) {
    revisions = [deck.master, ...decks[deck.master].branches];
  } else if (deck.branches) {
    revisions = [deck.deckid, ...deck.branches];
  } else {
    revisions = [deck.deckid];
  }

  const getLastDeckExcept = () => {
    const lastDeckArray = Object.values(decks)
      .filter((d) => !revisions.includes(d.deckid))
      .sort(byTimestamp);

    if (lastDeckArray.length > 0) {
      return lastDeckArray[0].deckid;
    } else {
      return null;
    }
  };

  const deleteDeck = () => {
    const url = `${process.env.API_URL}deck/${deck.deckid}`;
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options).then(() => {
      revisions.map((d) => {
        delete deckStore.decks[d];
      });
      setDeck(undefined);

      const lastDeckId = getLastDeckExcept();
      if (lastDeckId) {
        navigate(`/decks/${lastDeckId}`);
      } else {
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
        text={noText ? null : 'Delete'}
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
