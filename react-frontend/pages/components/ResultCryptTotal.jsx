import React, { useContext } from 'react';
import ResultCryptSortForm from './ResultCryptSortForm.jsx';
import AppContext from '../../context/AppContext.js';

function ResultCryptTotal(props) {
  const { cryptResults } = useContext(AppContext);
  const byGroups = {};
  const byGroupsCapacityTotal = {};
  let total = 0;

  cryptResults.map((card) => {
    if (byGroups[card['Group']]) {
      byGroups[card['Group']] += 1;
    } else {
      byGroups[card['Group']] = 1;
    }
    if (byGroupsCapacityTotal[card['Group']]) {
      byGroupsCapacityTotal[card['Group']] += card['Capacity'];
    } else {
      byGroupsCapacityTotal[card['Group']] = card['Capacity'];
    }
    total += 1;
  });

  const totalOutput = Object.keys(byGroups).map((k) => {
    return (
      <span key={k} className="d-inline-block nobr pr-3">
        <span className="blue">
          <b>G{k}:</b>
        </span>
        {byGroups[k]}
        <div
          className="d-flex small justify-content-center"
          title="Average Capacity"
        >
          ~{Math.round((byGroupsCapacityTotal[k] / byGroups[k]) * 10) / 10}
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
      <ResultCryptSortForm
        value={props.sortMethod}
        onChange={props.handleChange}
      />
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message">
      {value}
    </div>
  );
}

export default ResultCryptTotal;
