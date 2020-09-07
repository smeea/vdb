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
      <React.Fragment key={index}>
        <ResultLibraryType cardtype={key}/>
        {byTypes[key]}{' '}
      </React.Fragment>
    );
  });

  return (
    <div className='d-flex justify-content-between total'>
      <span>
        TOTAL: {total}
      </span>
      <span>
        {totalOutput}
      </span>
      <span>
      </span>
    </div>
  );
}

export default ResultLibraryTotal;
