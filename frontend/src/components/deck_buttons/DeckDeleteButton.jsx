import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import TrashFill from '@/assets/images/icons/trash-fill.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { deckServices } from '@/services';
import { deckStore, useApp } from '@/context';
import { byTimestamp } from '@/utils';
import { DECKS } from '@/constants';

const DeckDeleteButton = ({ deck, noText }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const getLastDeckExcept = () => {
    const lastDecks = Object.values(decks)
      .filter((d) => {
        if (d[BRANCHES] && d[BRANCHES].includes(deck[DECKID])) return false;
        if (d[MASTER]) return false;
        if (d[DECKID] === deck[DECKID]) return false;
        return true;
      })
      .toSorted(byTimestamp)
      .map((d) => d[DECKID]);

    return lastDecks[0] || null;
  };

  const handleClick = () => {
    deckServices.deckDelete(deck).then(() => {
      setShowConfirmation(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
      const lastDeckId = getLastDeckExcept();
      navigate(lastDeckId ? `/decks/${lastDeckId}` : '/decks');
    });
  };

  return (
    <>
      <ButtonIconed
        variant={noText || !isDesktop ? 'primary' : 'secondary'}
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
      {showConfirmation && (
        <ModalConfirmation
          withWrittenConfirmation={deck.isBranches}
          handleConfirm={handleClick}
          handleCancel={() => setShowConfirmation(false)}
          title={`Delete deck "${deck[NAME]}" and all its revisions`}
          buttonText="Delete"
          buttonVariant="danger"
        />
      )}
    </>
  );
};

export default DeckDeleteButton;
