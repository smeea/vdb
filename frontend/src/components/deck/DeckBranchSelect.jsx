import React, { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Select } from '@/components';
import { deckStore } from '@/context';
import { DECK, DECKS, DECKID, TIMESTAMP, BRANCHES, BRANCH_NAME, MASTER, NAME } from '@/constants';

const DeckBranchSelect = ({ deck, handleSelect }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const [branches, setBranches] = useState([]);

  const byTimestamp = (a, b) => {
    return new Date(decks[b][TIMESTAMP]) - new Date(decks[a][TIMESTAMP]);
  };

  const target = decks[deck[MASTER]] ?? deck;

  const b = {
    [target[DECKID]]: {
      [DECKID]: target[DECKID],
      [BRANCH_NAME]: target[BRANCH_NAME],
      [NAME]: target[NAME],
      [TIMESTAMP]: target[TIMESTAMP],
    },
  };

  if (target[BRANCHES]) {
    target[BRANCHES].map((i) => {
      b[i] = {
        [DECKID]: decks[i][DECKID],
        [BRANCH_NAME]: decks[i][BRANCH_NAME],
        [NAME]: decks[i][NAME],
        [TIMESTAMP]: decks[i][TIMESTAMP],
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
          name: DECK,
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
