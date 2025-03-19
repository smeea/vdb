import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSnapshot } from 'valtio';
import TrashFill from '@icons/trash-fill.svg?react';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { BRANCHES, DECKID, DECKS, IS_BRANCHES, MASTER, NAME } from '@/constants';
import { deckStore, useApp } from '@/context';
import { deckServices } from '@/services';
import { byTimestamp } from '@/utils';

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
    deckServices
      .deckDelete(deck)
      .then(() => {
        const lastDeckId = getLastDeckExcept();
        navigate(lastDeckId ? `/decks/${lastDeckId}` : '/decks');
      })
      .finally(() => {
        setShowConfirmation(false);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
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
          withWrittenConfirmation={deck[IS_BRANCHES]}
          handleConfirm={handleClick}
          handleCancel={() => setShowConfirmation(false)}
          title={`Delete deck "${deck[NAME]}" and all its revisions?`}
          buttonText="Delete"
          buttonVariant="danger"
        />
      )}
    </>
  );
};

export default DeckDeleteButton;
