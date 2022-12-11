import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import X from 'assets/images/icons/x.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingRandomDeck = ({ toggle, i, deck, disabled, remove }) => {
  return (
    <>
      <div
        className={`ps-2 flex items-center  ${
          !disabled && deck.state ? '' : 'gray'
        }`}
      >
        <div
          className="flex items-center"
          onClick={() => !disabled && toggle(i)}
        >
          <div className="flex items-center ">
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
        {deck.deckid ? (
          <Link target="_blank" to={`/decks/${deck.deckid}`}>
            <PlayFill width="18" height="18" viewBox="0 2 12 14" />
          </Link>
        ) : (
          <div className="cursor-pointer " onClick={() => remove(i)}>
            <X width="22" height="22" viewBox="0 0 16 16" />
          </div>
        )}
      </div>
    </>
  );
};

export default SeatingRandomDeck;
