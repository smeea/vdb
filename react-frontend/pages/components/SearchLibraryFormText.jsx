import React from 'react';

function SearchLibraryFormText(props) {
  return (
    <input
      placeholder='Card Name / Text'
      type='text'
      name='text'
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default SearchLibraryFormText;
