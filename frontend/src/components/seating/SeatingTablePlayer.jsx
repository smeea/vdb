import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from 'context';

const SeatingTablePlayer = ({ deck }) => {
  const { isMobile } = useApp();

  return (
    <div
      className={`flex justify-center ${isMobile ? '' : 'whitespace-nowrap'}  ${
        deck.first
          ? 'rounded-md border-2 border-dashed border-borderPrimary font-bold dark:border-borderPrimaryDark'
          : ''
      }`}
    >
      {deck.deckid ? (
        <Link target="_blank" rel="noreferrer" to={`/decks/${deck.deckid}`}>
          {deck.name}
        </Link>
      ) : (
        <>{deck.name}</>
      )}
    </div>
  );
};

export default SeatingTablePlayer;
