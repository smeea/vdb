import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import X from 'assets/images/icons/x.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingRandomDeck = ({ toggle, i, deck, disabled, remove }) => {
  return (
    <div
      className={`flex items-center space-x-1 ${
        !disabled && deck.state ? '' : 'text-midGray dark:text-midGrayDark'
      }`}
    >
      <div
        className="flex items-center space-x-2"
        onClick={() => !disabled && toggle(i)}
      >
        {deck.state ? (
          <ToggleOn width="22" height="22" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="22" height="22" viewBox="0 0 16 16" />
        )}
        <div>{deck.name}</div>
      </div>
      {deck.deckid ? (
        <Link target="_blank" to={`/decks/${deck.deckid}`}>
          <PlayFill width="18" height="18" viewBox="0 1 14 14" />
        </Link>
      ) : (
        <div className="text-fgRed dark:text-fgRedDark cursor-pointer" onClick={() => remove(i)}>
          <X width="22" height="22" viewBox="0 0 16 16" />
        </div>
      )}
    </div>
  );
};

export default SeatingRandomDeck;
