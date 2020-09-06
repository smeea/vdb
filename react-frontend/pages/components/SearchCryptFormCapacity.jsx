import React from 'react';

function SearchCryptFormCapacity(props) {
  const capacity = ['ANY', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const capacityforms = capacity.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const capacitymoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];

  const capacitymorelessforms = capacitymoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Capacity:
        </label>
      </div>
      <div className='form-group col-9'>
        <div className='input-group'>
          <select className='custom-select' name='capacitymoreless' value={props.moreless} onChange={props.onMorelessChange}>
            {capacitymorelessforms}
          </select>
          <select className='custom-select' name='capacity' value={props.value} onChange={props.onValueChange} >
            {capacityforms}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchCryptFormCapacity;
