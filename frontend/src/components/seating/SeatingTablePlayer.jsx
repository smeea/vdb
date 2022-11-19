import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from 'context';

const SeatingTablePlayer = ({ deck }) => {
  const { isMobile } = useApp();

  return (
    <div
      className={`d-flex justify-content-center ${
        isMobile ? '' : 'nowrap'
      } p-2 p-md-3 ${deck.first ? 'border-dashed bold' : ''}`}
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
