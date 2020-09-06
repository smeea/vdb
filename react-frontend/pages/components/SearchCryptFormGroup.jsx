import React from 'react';

function SearchCryptFormGroup(props) {
  const groups = [1, 2, 3, 4, 5, 6];

  const groupforms = groups.map( (i, index) => {
    return (
      <div key={index} className='ml-2 custom-control custom-checkbox'>
        <input id={i} name='group' className='mr-1 custom-control-input' type='checkbox' checked={props.value[i]} onChange={e => props.onChange(e)} />
        <label htmlFor={i} className='mr-0 custom-control-label'>
          {i}
        </label>
      </div>
    );
  });

  return (
    <div className='form-row justify-content-between'>
      <div className='col-2'>
        <h6>Group:</h6>
      </div>
      {groupforms}
    </div>
  );
}

export default SearchCryptFormGroup;
