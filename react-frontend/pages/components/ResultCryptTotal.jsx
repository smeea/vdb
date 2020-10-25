import React from 'react';

import AlertMessage from './AlertMessage.jsx';
import ResultCryptSortForm from './ResultCryptSortForm.jsx';

function ResultCryptTotal(props) {
  const byGroups = {};
  let total = 0;

  props.cards.map((card, index) => {
    if (byGroups[card['Group']]) {
      byGroups[card['Group']] += 1;
    } else {
      byGroups[card['Group']] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byGroups).map((key, index) => {
    return (
      <span key={index} className="d-inline-block nobr pr-3">
        <span className="crypt-total">
          <b>G{key}:</b>
        </span>
        {byGroups[key]}
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      {props.showSort == true && props.sortedCards.length > 0 && (
        <ResultCryptSortForm
          value={props.sortMethod}
          onChange={props.handleChange}
        />
      )}
    </>
  );

  return <AlertMessage className="info-message">{value}</AlertMessage>;
}

export default ResultCryptTotal;
