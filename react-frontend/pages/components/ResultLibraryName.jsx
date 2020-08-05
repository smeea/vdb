import React from 'react';

function ResultLibraryName(props) {
  return (
    <td className='name'>
      <div onClick={() => props.toggleHidden(props.id)}>
        {props.value} {props.ban && ' [BANNED]'}
      </div>
    </td>
  );
}

export default ResultLibraryName;
