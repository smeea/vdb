import React, { useState, useEffect } from 'react';

function DeckSelectDeck(props) {
  const [state, setState] = useState(props.decks);

  const deckDefaultOption = [
    <option key='-1'>
      Select Deck
    </option>
  ]

  const decksPreOptions = Object.keys(state).map((i, index) => {
    return(
      [
        <option key={index} value={i}>
          {state[i]['name']} rev. {new Date(state[i]['timestamp']).toISOString().slice(0, 10)}
        </option>
        , state[i]['timestamp']
      ]
    );
  });

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1])
  };

  const decksOptions = deckDefaultOption.concat(decksPreOptions.sort(byTimestamp));

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
