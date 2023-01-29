import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context';

const SeatingTablePlayer = ({ deck, isFirst }) => {
  const { isMobile } = useApp();

  return (
    <div
      className={`flex justify-center ${isMobile ? '' : 'whitespace-nowrap'}  ${
        isFirst
          ? 'rounded-md border-2 border-dashed border-borderPrimary font-bold dark:border-borderPrimaryDark p-3'
          : 'p-3.5'
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
