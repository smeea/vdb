import React from 'react';
import { useSnapshot } from 'valtio';
import { deckStore } from '@/context';
import { DECKS } from '@/utils/constants';

const DeckSelectAdvTotal = ({ tagsFilter, setTagsFilter }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const byTags = {};
  let total = 0;

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    }
  };

  Object.values(decks).map((deck) => {
    if (deck.tags) {
      deck.tags.map((tag) => {
        if (byTags[tag]) {
          byTags[tag] += 1;
        } else {
          byTags[tag] = 1;
        }
      });
      total += 1;
    }
  });

  const totalOutput = Object.keys(byTags).map((k) => {
    return (
      <span key={k} onClick={() => handleClick(k)} className="inline-block whitespace-nowrap">
        <span className="font-bold text-fgSecondary dark:text-fgSecondaryDark">{k}:</span>
        {byTags[k]}
      </span>
    );
  });

  const value = (
    <>
      <div className="whitespace-nowrap font-bold">TOTAL: {total}</div>
      <div>{totalOutput}</div>
      <div />
    </>
  );

  return (
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      {value}
    </div>
  );
};

export default DeckSelectAdvTotal;
