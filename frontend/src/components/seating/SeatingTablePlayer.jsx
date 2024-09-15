import React from 'react';
import { Link } from 'react-router-dom';

const SeatingTablePlayer = ({ deck, isFirst }) => {
  return (
    <div
      className={`flex justify-center sm:whitespace-nowrap ${
        isFirst
          ? 'rounded-md border-2 border-dashed border-borderPrimary p-3 font-bold dark:border-borderPrimaryDark'
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
