import React from 'react';
import { ResultLibraryTypeImage, ResultLibrarySortForm } from 'components';
import { useApp } from 'context';

function ResultLibraryTotal({ cards, handleChange }) {
  const byTypes = {};
  let total = 0;

  cards.map((card, index) => {
    if (byTypes[card.Type]) {
      byTypes[card.Type] += 1;
    } else {
      byTypes[card.Type] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byTypes).map((k, index) => {
    return (
      <span key={k} className="d-inline-block nobr pe-3">
        <ResultLibraryTypeImage value={k} />
        {byTypes[k]}
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <ResultLibrarySortForm onChange={handleChange} />
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message">
      {value}
    </div>
  );
}

export default ResultLibraryTotal;
