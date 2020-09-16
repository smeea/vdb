import React from 'react';
import Select from 'react-select';

function SearchCryptFormVotes(props) {
  const votes = [
    ['any', 'ANY'],
    ['1', '1+'],
    ['2', '2+'],
    ['3', '3+'],
    ['4', '4+'],
  ];

  const options = []

  votes.map((i, index) => {
    options.push(
      {
        value: i[0],
        name: 'votes',
        label:
        <>
          <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          </span>
          {i[1]}
        </>
      }
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Votes:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select
          options={options}
          isSearchable={false}
          name='votes'
          value={options.find(obj => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchCryptFormVotes;
