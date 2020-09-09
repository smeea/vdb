import React, { useState, useEffect } from 'react';

function DeckSelectDeck(props) {
  const [state, setState] = useState(props.decks);

  let defaultOption;
  if (Object.keys(state).length > 0) {
    defaultOption =
      <option value='' disabled hidden>
        Select deck
      </option>;
  } else {
    defaultOption =
      <option value='' disabled hidden>
        No decks available
      </option>;
  }

  const decksOptions = Object.keys(state).map((i, index) => {
    return (
      <option key={index} value={i}>
        {state[i]['name']}
      </option>
    );
  });

  useEffect(() => {
    setState(props.decks);
  }, [props.decks]);

  return (
    <>
      <select defaultValue=''
              className='custom-select'
              value={props.activeDeck}
              onChange={(e) => props.setActiveDeck(e.target.value)}
      >
        {defaultOption}
        {decksOptions}
      </select>
    </>
  );
};

export default DeckSelectDeck;
