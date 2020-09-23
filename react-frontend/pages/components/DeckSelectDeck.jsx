import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function DeckSelectDeck(props) {
  const [state, setState] = useState(props.decks);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1])
  };

  const decksPreOptions = Object.keys(state).map((i, index) => {
    return(
      [
        {
          value: i,
          name: 'deck',
          label:
          <div className='d-flex justify-content-between'>
            {state[i]['name']}{' '}
            <span className='pl-2 select-deck-date'>
              {new Date(state[i]['timestamp']).toISOString().slice(0, 10)}
            </span>
          </div>
        }, state[i]['timestamp']
      ]
    );
  });

  const decksOptions = decksPreOptions.sort(byTimestamp).map((i, index) => {
    return(i[0])
  });

  useEffect(() => {
    setState(props.decks);
  }, [props.decks]);

  return (
    <Select
      options={decksOptions}
      isSearchable={false}
      name='decks'
      value={decksOptions.find(obj => obj.value === props.activeDeck)}
      onChange={(e) => props.setActiveDeck(e.value)}
    />
  );
};

export default DeckSelectDeck;
