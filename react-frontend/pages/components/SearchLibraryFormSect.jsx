import React from 'react';

function SearchLibraryFormSect(props) {
  const sects = [
    ['ANY', 'ANY'],
    ['Camarilla', 'camarilla'],
    ['Sabbat', 'sabbat'],
    ['Laibon', 'laibon'],
    ['Independent', 'independent'],
    ['Anarch', 'anarch'],
    ['Imbued', 'imbued'],
  ];

  const sectforms = sects.map((i, index) => {
    return(
      <option key={index} value={i[1]}>{i[0]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Sect:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='sect' value={props.value} onChange={props.onChange}>
          {sectforms}
        </select>
      </div>
    </div>
  );
}

export default SearchLibraryFormSect;
