import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from '@/assets/images/icons/play-fill.svg?react';
import X from '@/assets/images/icons/x.svg?react';
import { Toggle } from '@/components';

const SeatingDeck = ({ toggle, i, deck, disabled, remove }) => {
  return (
    <div className="flex items-center">
      <Toggle
        isOn={deck.state}
        toggle={() => toggle(i)}
        size="sm"
        disabled={disabled}
      >
        <div className="inline">{deck.name}</div>
      </Toggle>
      {deck.deckid ? (
        <Link className="p-1" target="_blank" to={`/decks/${deck.deckid}`}>
          <PlayFill width="20" height="20" viewBox="0 0 16 16" />
        </Link>
      ) : (
        <div
          className="cursor-pointer p-0.5 text-fgRed dark:text-fgRedDark"
          onClick={() => remove(i)}
        >
          <X width="22" height="22" viewBox="0 0 16 16" />
        </div>
      )}
    </div>
  );
};

export default SeatingDeck;
