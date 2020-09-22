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
      <React.Fragment key={index}>
        <span className='px-2'>
          <span className='crypt-total'>
            <b>G{key}:</b>
          </span>
          {byGroups[key]}
        </span>
      </React.Fragment>
    );
  });

  return (
    <div className='d-flex justify-content-between total'>
      <span className='px-2'>
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

export default ResultCryptTotal;
