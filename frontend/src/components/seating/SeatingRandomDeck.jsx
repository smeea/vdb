import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import X from 'assets/images/icons/x.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingRandomDeck = ({ toggle, i, deck, disabled, remove }) => {
  return (
    <div
      className={`flex items-center ${
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
        <div className="inline">{deck.name}</div>
      </div>
      {deck.deckid ? (
        <Link className="p-1" target="_blank" to={`/decks/${deck.deckid}`}>
          <PlayFill width="20" height="20" viewBox="0 0 16 16" />
        </Link>
      ) : (
        <div
          className="cursor-pointer text-fgRed dark:text-fgRedDark p-0.5"
          onClick={() => remove(i)}
        >
          <X width="22" height="22" viewBox="0 0 16 16" />
        </div>
      )}
    </div>
  );
};

export default SeatingRandomDeck;
