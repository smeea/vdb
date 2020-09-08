import React from 'react';
import { SortDown } from 'react-bootstrap-icons';

function ResultCryptSortForm(props) {
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
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <SortDown size={24} />
        </span>
      </div>
      <select className='custom-select' name='sort' value={props.value} onChange={props.onChange}>
        {sortFormOptions}
      </select>
    </div>
  );
}

export default ResultCryptSortForm;
