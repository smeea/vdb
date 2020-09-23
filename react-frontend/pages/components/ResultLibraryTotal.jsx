import React from 'react';

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
      <span key={index} className='pr-3'>
        <ResultLibraryType cardtype={key}/>
        {byTypes[key]}
      </span>
    );
  });

  return (
    <div className='d-flex align-items-center justify-content-between total'>
      <div className='px-2 nobr'>
        TOTAL: {total}
      </div>
      <div>
        {totalOutput}
      </div>
      <div>
      </div>
    </div>
  );
}

export default ResultLibraryTotal;
