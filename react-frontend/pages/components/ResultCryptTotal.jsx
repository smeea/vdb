import React from 'react';

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
      <span key={index} className='pr-3'>
        <span className='crypt-total'>
          <b>G{key}:</b>
        </span>
        {byGroups[key]}
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

export default ResultCryptTotal;
