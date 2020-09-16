import React from 'react';
import Select from 'react-select';

function SearchLibraryFormTitle(props) {
  const titles = [
    'ANY',
    'NONE',
    'Primogen',
    'Prince',
    'Justicar',
    'Inner Circle',
    'Baron',
    '1 vote',
    '2 votes',
    'Bishop',
    'Archbishop',
    'Priscus',
    'Cardinal',
    'Regent',
    'Magaji',
  ];

  const options = []

  titles.map((i, index) => {
    options.push(
      {
        value: i.toLowerCase(),
        name: 'title',
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
          Title:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select
          options={options}
          name='title'
          value={options.find(obj => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormTitle;
