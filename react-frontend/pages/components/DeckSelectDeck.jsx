import React, { useState, useEffect } from 'react';

function DeckSelectDeck(props) {
  const [state, setState] = useState(props.decks);

  let option_default;
  if (Object.keys(state).length > 0) {
    option_default =
      <option value='' disabled hidden>
        Select deck
      </option>;
  } else {
    option_default =
      <option value='' disabled hidden>
        No decks available
      </option>;
  }

  const decksform = Object.keys(state).map((i, index) => {
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
    <React.Fragment>
      <select defaultValue='' className='custom-select' value={props.activedeck} onChange={props.handleActiveDeckSelect}>
        {option_default}
        {decksform}
      </select>
    </React.Fragment>
  );
};

export default DeckSelectDeck;
