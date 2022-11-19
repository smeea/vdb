import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingRandomDeck = ({ toggle, i, deck, disabled }) => {
  return (
    <>
      <div
        className={`d-flex align-items-center ps-2 py-1 ${
          !disabled && deck.state ? '' : 'gray'
        }`}
      >
        <div
          className="d-flex align-items-center"
          onClick={() => !disabled && toggle(i)}
        >
          <div className="d-flex align-items-center pe-2">
            <>
              {deck.state ? (
                <ToggleOn width="22" height="22" viewBox="0 0 16 16" />
              ) : (
                <ToggleOff width="22" height="22" viewBox="0 0 16 16" />
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
