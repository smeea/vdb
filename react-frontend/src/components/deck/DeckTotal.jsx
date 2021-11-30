import React, { useContext } from 'react';
import AppContext from 'context/AppContext.js';

function DeckTotal(props) {
  const { decks } = useContext(AppContext);
  const byTags = {};
  let total = 0;

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
      <span key={k} className="d-inline-block nobr pe-3">
        <span className="blue">
          <b>{k}:</b>
        </span>
        {byTags[k]}
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
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
}

export default DeckTotal;
