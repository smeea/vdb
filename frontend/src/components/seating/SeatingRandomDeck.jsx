import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingRandomDeck = ({ toggle, i, deck }) => {
  return (
    <>
      <div
        className={`d-flex align-items-center py-1 ${
          deck.state ? '' : 'gray-font'
        }`}
      >
        <div className="d-flex align-items-center" onClick={() => toggle(i)}>
          <div className="d-flex align-items-center pe-2">
            <>
              {deck.state ? (
                <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
              ) : (
                <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
              )}
            </>
          </div>
          {deck.name}
        </div>
        {deck.deckid && (
          <Link className="px-1" target="_blank" to={`/decks/${deck.deckid}`}>
            <PlayFill height="18" viewBox="0 2 12 14" />
          </Link>
        )}
      </div>
    </>
  );
};

export default SeatingRandomDeck;
