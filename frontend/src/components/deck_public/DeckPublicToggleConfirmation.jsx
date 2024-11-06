import React from 'react';
import { ModalConfirmation } from '@/components';
import { countCards } from '@/utils';

const DeckPublicToggleConfirmation = ({ deck, handleConfirmation, setShow }) => {
  const isPublished = !!(deck.publicParent || deck.publicChild);

  const isWrongQtyCards =
    countCards(Object.values(deck[CRYPT])) > 35 ||
    countCards(Object.values(deck[CRYPT])) < 12 ||
    countCards(Object.values(deck[LIBRARY])) < 60 ||
    countCards(Object.values(deck[LIBRARY])) > 90;

  const withPlaytestCards =
    Object.keys(deck[CRYPT]).some((cardid) => cardid > 210000) ||
    Object.keys(deck[LIBRARY]).some((cardid) => cardid > 110000);

  return (
    <ModalConfirmation
      handleConfirm={handleConfirmation}
      handleCancel={() => setShow(false)}
      title={
        isPublished
          ? `Remove "${deck[NAME]}" from Public Deck Archive?`
          : `Add "${deck[NAME]}" to Public Deck Archive?`
      }
      disabled={isWrongQtyCards || withPlaytestCards}
      buttonText={isPublished ? 'Remove Public' : 'Make Public'}
    >
      {isWrongQtyCards ? (
        <div className="text-fgRed dark:text-fgRedDark">
          Public Deck must have 12-35 crypt and 60-90 library cards
        </div>
      ) : withPlaytestCards ? (
        'Public Deck cannot have playtest cards'
      ) : isPublished ? (
        'This will not remove the deck from your deck library, but will stop to show it in Public Deck Archive'
      ) : (
        'You can remove it from Public Deck Archive at any time'
      )}
    </ModalConfirmation>
  );
};

export default DeckPublicToggleConfirmation;
