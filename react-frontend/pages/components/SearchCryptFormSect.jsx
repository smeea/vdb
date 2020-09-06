import React from 'react';

function SearchCryptFormSect(props) {
  const sects = [
    'ANY',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ];

  const sectforms = sects.map((i, index) => {
    return(
      <option key={index} value={i}>{i}</option>
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

export default SearchCryptFormSect;
