import React from 'react';
import Select from 'react-select';
import precons from './forms_data/precons.json';

function DeckSelectPrecon(props) {
  const options = []
  precons.map((i, index) => {
    if (i[0] != 'any' && i[0] != 'bcp') {
      options.push({
        value: `${i[1]}:${i[2]}`,
        name: 'precon',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="pr-2">{i[3]}</div>
            <div className="pl-2 small">{`${i[1]} '${i[0]}`}</div>
          </div>
        ),
      });
    }
  });

  return (
    <>
      <Select
        options={options}
        isSearchable={false}
        name="decks"
        placeholder="Select Deck"
        value={options.find((obj) => obj.value === props.activeDeck.deckid)}
        onChange={(e) => props.setActiveDeck({src: 'precons', deckid: e.value})}
      />
    </>
  );
}

export default DeckSelectPrecon;
