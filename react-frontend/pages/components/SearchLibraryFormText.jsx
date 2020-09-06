import React from 'react';

function SearchLibraryFormText(props) {
  return (
    <div className='col-8'>
      <input
        placeholder='Card Name / Text'
        type='text'
        name='text'
        value={props.value}
        onChange={props.onChange}/>
    </div>
  );
}

export default SearchLibraryFormText;
