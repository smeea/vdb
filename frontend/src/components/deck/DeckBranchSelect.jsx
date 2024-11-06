import React, { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Select } from '@/components';
import { deckStore } from '@/context';
import { DECKS } from '@/constants';

const DeckBranchSelect = ({ deck, handleSelect }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const [branches, setBranches] = useState([]);

  const byTimestamp = (a, b) => {
    return new Date(decks[b][TIMESTAMP]) - new Date(decks[a][TIMESTAMP]);
  };

  const target = decks[deck[MASTER]] ?? deck;

  const b = {
    [target[DECKID]]: {
      deckid: target[DECKID],
      branchName: target[BRANCH_NAME],
      name: target[NAME],
      timestamp: target[TIMESTAMP],
    },
  };

  if (target[BRANCHES]) {
    target[BRANCHES].map((i) => {
      b[i] = {
        deckid: decks[i][DECKID],
        branchName: decks[i][BRANCH_NAME],
        name: decks[i][NAME],
        timestamp: decks[i][TIMESTAMP],
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
          label: decks[i][BRANCH_NAME],
        };
      });
  }, [branches]);

  return (
    <Select
      options={options}
      isSearchable={false}
      value={options.find((obj) => obj.value === deck[DECKID])}
      onChange={handleSelect}
    />
  );
};

export default DeckBranchSelect;
