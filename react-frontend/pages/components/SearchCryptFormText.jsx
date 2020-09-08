import React from 'react';

function SearchCryptFormText(props) {
  return (
    <>
      <input
        placeholder='Card Name / Text'
        type='text'
        name='text'
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}

export default SearchCryptFormText;
