import React, { useEffect, useState } from 'react';
import DeckRemoveDeck from './DeckRemoveDeck.jsx';

function DeckSelectDeck(props) {

  let option_default;
  if (Object.keys(props.decks).length > 0) {
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

  const decksform = Object.keys(props.decks).map((i, index) => {
    return (
      <option key={index} value={i}>
        {props.decks[i]['name']}
      </option>
    );
  });

  return (
    <div>
      <select defaultValue="" className="custom-select" value={props.activedeck} onChange={props.handleActiveDeckSelect}>
        {option_default}
        {decksform}
      </select>
      <DeckRemoveDeck activedeck={props.activedeck} />
    </div>
  );
};

export default DeckSelectDeck;
