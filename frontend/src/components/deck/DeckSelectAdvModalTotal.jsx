import React from 'react';
import { useSnapshot } from 'valtio';
import { deckStore } from 'context';

const DeckSelectAdvModalTotal = ({ tagsFilter, setTagsFilter }) => {
  const decks = useSnapshot(deckStore).decks;
  const byTags = {};
  let total = 0;

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((i) => i !== tag));
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

  const totalOutput = Object.keys(byTags)
    .sort()
    .map((k) => {
      return (
        <span
          key={k}
          onClick={() => handleClick(k)}
          className="d-inline-block whitespace-nowrap pe-3"
        >
          <span className="blue">
            <b>{k}:</b>
          </span>
          {byTags[k]}
        </span>
      );
    });

  const value = (
    <>
      <div className="px-2 whitespace-nowrap">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <div />
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message">
      {value}
    </div>
  );
};

export default DeckSelectAdvModalTotal;
