import React from 'react';

function ResultLibrarySortForm(props) {
  const sortMethods = [
    'Default',
    'Clan',
    'Discipline',
    'Name',
    'Type',
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

export default ResultLibrarySortForm;
