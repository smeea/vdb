import React, { useContext } from 'react';
import ResultLibraryTypeImage from './ResultLibraryTypeImage.jsx';
import ResultLibrarySortForm from './ResultLibrarySortForm.jsx';
import AppContext from '../../context/AppContext.js';

function ResultLibraryTotal(props) {
  const { libraryResults } = useContext(AppContext);
  const byTypes = {};
  let total = 0;

  libraryResults.map((card, index) => {
    if (byTypes[card['Type']]) {
      byTypes[card['Type']] += 1;
    } else {
      byTypes[card['Type']] = 1;
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
      <ResultLibrarySortForm onChange={props.handleChange} />
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message">
      {value}
    </div>
  );
}

export default ResultLibraryTotal;
