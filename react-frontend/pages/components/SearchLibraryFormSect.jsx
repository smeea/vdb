import React from 'react';
import Select from 'react-select';

function SearchLibraryFormSect(props) {
  const sects = [
    'ANY',
    'NONE',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ];

  const options = []

  sects.map((i, index) => {
    options.push(
      {
        value: i.toLowerCase(),
        name: 'sect',
        label:
        <>
          <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          </span>
          {i}
        </>
      }
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
        <Select
          options={options}
          name='sect'
          value={options.find(obj => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormSect;
