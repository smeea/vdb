import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from 'context';

const SeatingTablePlayer = ({ deck }) => {
  const { isMobile } = useApp();

  return (
    <div
      className={`flex justify-center ${
        isMobile ? '' : 'whitespace-nowrap'
      } p-md-3 p-2 ${deck.first ? 'border-dashed font-bold' : ''}`}
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
