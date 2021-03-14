import React from 'react';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibrarySortForm from './ResultLibrarySortForm.jsx';

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
      <ResultLibrarySortForm
        value={props.sortMethod}
        onChange={props.handleChange}
      />
    </>
  );

  return <div className="d-flex align-items-center justify-content-between info-message">{value}</div>;
}

export default ResultLibraryTotal;
