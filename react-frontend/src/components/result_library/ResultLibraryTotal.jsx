import React from 'react';
import { ResultLibraryTypeImage, ResultLibrarySortForm } from 'components';

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
        <div className="d-flex align-items-center">
          <ResultLibraryTypeImage value={k} />
          {byTypes[k]}
        </div>
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
    <div className="d-flex align-items-center justify-content-between info-message pe-1 pe-md-0">
      {value}
    </div>
  );
}

export default ResultLibraryTotal;
