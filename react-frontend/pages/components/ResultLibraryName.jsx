import React from 'react';

function ResultLibraryName(props) {
  return (
    <td className='name'>
      {props.value} {props.ban && ' [BANNED]'}
    </td>
  );
}

export default ResultLibraryName;
