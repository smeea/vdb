import React, { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import { deckStore } from '@/context';

const DeckBranchSelect = ({ deck, handleSelect }) => {
  const decks = useSnapshot(deckStore).decks;
  const [branches, setBranches] = useState([]);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const target = decks[deck.master] ?? deck;

  const b = {
    [target.deckid]: {
      deckid: target.deckid,
      branchName: target.branchName,
      name: target.name,
      timestamp: target.timestamp,
    },
  };

  if (target.branches) {
    target.branches.map((i) => {
      b[i] = {
        deckid: decks[i].deckid,
        branchName: decks[i].branchName,
        name: decks[i].name,
        timestamp: decks[i].timestamp,
      };
    });
  }

  if (JSON.stringify(branches) != JSON.stringify(b)) {
    setBranches(b);
  }

  const options = useMemo(() => {
    return Object.keys(branches)
      .map((i) => {
        return [
          {
            value: i,
            name: 'deck',
            label: decks[i].branchName,
          },
          decks[i]['timestamp'],
        ];
      })
      .sort(byTimestamp)
      .map((i) => i[0]);
  }, [branches]);

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={false}
      value={options.find((obj) => obj.value === deck.deckid)}
      onChange={handleSelect}
    />
  );
};

export default DeckBranchSelect;
