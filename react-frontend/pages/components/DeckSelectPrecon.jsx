import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function DeckSelectPrecon(props) {
  // console.log(props.decks)
  const [state, setState] = useState(props.decks);

  const options = Object.keys(state).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            {state[i]['name']}
            {/* <div className="d-flex align-items-center pl-2 small"> */}
            {/*   {new Date(state[i]['timestamp']).toISOString().slice(0, 10)} */}
            {/* </div> */}
          </div>
        ),
      },
      state[i]['timestamp'],
    ];
  });

  useEffect(() => {
    setState(props.decks);
  }, [props.decks]);

  return (
    <Select
      options={options}
      isSearchable={false}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === props.activeDeck)}
      onChange={(e) => {
        if (e.value) {
          props.setActiveDeck(e.value);
        } else {
          props.setActiveDeck(undefined);
        }
      }}
    />
  );
}

export default DeckSelectPrecon;
