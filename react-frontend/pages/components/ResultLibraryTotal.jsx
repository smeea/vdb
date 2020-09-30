import React from 'react';

import AlertMessage from './AlertMessage.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function ResultLibraryTotal(props) {
  const byTypes = {};
  let total = 0;

  props.cards.map((card, index) => {
    if (byTypes[card['Type']]) {
      byTypes[card['Type']] += 1;
    } else {
      byTypes[card['Type']] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byTypes).map((key, index) => {
    return (
      <span key={index} className="d-inline-block nobr pr-3">
        <ResultLibraryType cardtype={key} />
        {byTypes[key]}
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

  return <AlertMessage className="info-message" value={value} />;
}

export default ResultLibraryTotal;
