import React from 'react';

function ResultCryptFormSort(props) {
  const sortMethods = [
    'Default',
    'Capacity',
    'Clan',
    'Group',
    'Name',
  ];

  const sortFormOptions = sortMethods.map((i, index) => {
    return(
      <option key={index} value={i}>{i}</option>
    );
  });

  return (
    <div className='form-group'>
      <select className='custom-select' name='sort' value={props.value} onChange={props.onChange}>
        {sortFormOptions}
      </select>
    </div>
  );
}

export default ResultCryptFormSort;
