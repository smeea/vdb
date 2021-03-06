import React from 'react';
import Select from 'react-select';

function DeckBranchSelect(props) {
  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const deck = props.decks[props.activeDeck.deckid];
  const master = props.decks[deck.master];

  let branches;
  if (master) {
    branches = { [master.deckid]: master };
    master.branches.map((i) => {
      branches[i] = props.decks[i];
    });
  } else {
    branches = { [deck.deckid]: deck };
    if (deck.branches) {
      deck.branches.map((i) => {
        branches[i] = props.decks[i];
      });
    }
  }

  const preOptions = Object.keys(branches).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: props.decks[i].branchName,
      },
      props.decks[i]['timestamp'],
    ];
  });

  const options = preOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  return (
    <Select
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
