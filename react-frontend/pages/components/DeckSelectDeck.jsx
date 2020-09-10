import React, { useState, useEffect } from 'react';

function DeckSelectDeck(props) {
  const [state, setState] = useState(props.decks);

  const decksOptions = [
    <option key='-1'>
      Select Deck
    </option>
  ]

  Object.keys(state).map((i, index) => {
    decksOptions.push(
      <option key={index} value={i}>
        {state[i]['name']}
      </option>
    );
  });

  useEffect(() => {
    setState(props.decks);
  }, [props.decks]);

  return (
    <select className='custom-select'
            value={props.activeDeck}
            onChange={(e) => props.setActiveDeck(e.target.value)}
    >
      {decksOptions}
    </select>
  );
};

export default DeckSelectDeck;
