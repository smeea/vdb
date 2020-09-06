import React from 'react';

function SearchLibraryFormBloodCost(props) {
  const blood = ['ANY', 1, 2, 3, 4];
  const bloodforms = blood.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const bloodmoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];
  const bloodmorelessforms = bloodmoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Blood Cost:
        </label>
      </div>
      <div className='form-group col-9'>
        <div className='input-group'>
          <select className='custom-select' name='bloodmoreless' value={props.moreless} onChange={props.onMorelessChange}>
            {bloodmorelessforms}
          </select>
          <select className='custom-select' name='blood' value={props.value} onChange={props.onValueChange} >
            {bloodforms}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchLibraryFormBloodCost;
