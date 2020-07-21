import React, { useEffect, useState } from 'react';
import DeckRemoveDeck from './DeckRemoveDeck.jsx';

function DeckSelectDeck(props) {
  const handleActiveDeckSelect = props.handleActiveDeckSelect;
  const decks = props.decks;
  const activedeck = props.value;

  let option_default;
  if (Object.keys(decks).length > 0) {
    option_default =
      <option value="" disabled hidden>
        Select deck
      </option>;
  } else {
    option_default =
      <option value="" disabled hidden>
        No decks available
      </option>;
  }

  const decksform = Object.keys(decks).map((i, index) => {
    return (
      <option key={index} value={i}>
        {decks[i]['name']}
      </option>
    );
  });

  return (
    <div>
      <select defaultValue="" className="custom-select" value={activedeck} onChange={handleActiveDeckSelect}>
        {option_default}
        {decksform}
      </select>
      <DeckRemoveDeck activedeck={props.activedeck} />
    </div>
  );
};

export default DeckSelectDeck;
