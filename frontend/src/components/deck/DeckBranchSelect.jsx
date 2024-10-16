import React, { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Select } from '@/components';
import { deckStore } from '@/context';
import { DECKS } from '@/utils/constants';

const DeckBranchSelect = ({ deck, handleSelect }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const [branches, setBranches] = useState([]);

  const byTimestamp = (a, b) => {
    return new Date(decks[b].timestamp) - new Date(decks[a].timestamp);
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
      .filter((i) => decks[i])
      .toSorted(byTimestamp)
      .map((i) => {
        return {
          value: i,
          name: 'deck',
          label: decks[i].branchName,
        };
      });
  }, [branches]);

  return (
    <Select
      options={options}
      isSearchable={false}
      value={options.find((obj) => obj.value === deck.deckid)}
      onChange={handleSelect}
    />
  );
};

export default DeckBranchSelect;
