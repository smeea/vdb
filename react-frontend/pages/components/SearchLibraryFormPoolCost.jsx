import React from 'react';

function SearchLibraryFormPoolCost(props) {
  const pool = ['ANY', 1, 2, 3, 4, 5, 6];
  const poolforms = pool.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const poolmoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];
  const poolmorelessforms = poolmoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Pool Cost:
        </label>
      </div>
      <div className='form-group col-9'>
        <div className='input-group'>

          <select className='custom-select' name='poolmoreless' value={props.moreless} onChange={props.onMorelessChange}>
            {poolmorelessforms}
          </select>
          <select className='custom-select' name='pool' value={props.value} onChange={props.onValueChange} >
            {poolforms}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchLibraryFormPoolCost;
