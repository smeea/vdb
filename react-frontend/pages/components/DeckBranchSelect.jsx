import React, { useContext } from 'react';
import Select from 'react-select';
import AppContext from '../../context/AppContext.js';

function DeckBranchSelect(props) {
  const { decks } = useContext(AppContext);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const deck = decks[props.activeDeck.deckid];
  const master = decks[deck.master];

  let branches;
  if (master) {
    branches = { [master.deckid]: master };
    master.branches.map((i) => {
      branches[i] = decks[i];
    });
  } else {
    branches = { [deck.deckid]: deck };
    if (deck.branches) {
      deck.branches.map((i) => {
        branches[i] = decks[i];
      });
    }
  }

  const preOptions = Object.keys(branches).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: decks[i].branchName,
      },
      decks[i]['timestamp'],
    ];
  });

  const options = preOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={false}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === props.activeDeck.deckid)}
      onChange={(e) => props.setActiveDeck({ src: 'my', deckid: e.value })}
    />
  );
}

export default DeckBranchSelect;
