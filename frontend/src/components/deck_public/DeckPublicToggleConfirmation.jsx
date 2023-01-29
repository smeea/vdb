import React from 'react';
import { ModalConfirmation } from '@/components';
import { countCards } from '@/utils';

const DeckPublicToggleConfirmation = ({
  deck,
  handleConfirmation,
  setShow,
}) => {
  const isPublished = Boolean(deck.publicParent || deck.publicChild);

  const isWrongQtyCards =
    countCards(Object.values(deck.crypt)) > 35 ||
    countCards(Object.values(deck.crypt)) < 12 ||
    countCards(Object.values(deck.library)) < 60 ||
    countCards(Object.values(deck.library)) > 90;

  const withPlaytestCards =
    Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
    Object.keys(deck.library).some((cardid) => cardid > 110000);

  return (
    <ModalConfirmation
      handleConfirm={handleConfirmation}
      handleCancel={() => setShow(false)}
      headerText={
        isPublished
          ? `Remove "${deck.name}" from Public Deck Archive?`
          : `Add "${deck.name}" to Public Deck Archive?`
      }
      mainText={
        isWrongQtyCards ? (
          <div className="text-fgRed dark:text-fgRedDark">
            Public Deck must have 12-35 crypt and 60-90 library cards
          </div>
        ) : withPlaytestCards ? (
          'Public Deck cannot have playtest cards'
        ) : isPublished ? (
          'This will not remove the deck from your deck library, but will stop to show it in Public Deck Archive'
        ) : (
          'You can remove it from Public Deck Archive at any time'
        )
      }
      buttonText={
        isWrongQtyCards || withPlaytestCards
          ? null
          : isPublished
          ? 'Remove Public'
          : 'Make Public'
      }
    />
  );
};

export default DeckPublicToggleConfirmation;
