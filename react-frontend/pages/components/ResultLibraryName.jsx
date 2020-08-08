import React from 'react';

function ResultLibraryName(props) {
  return (
    <td className='name'>
      <div onClick={() => props.toggleHidden(props.id)}>
        <a href='#'>
          {props.value} {props.ban && ' [BANNED]'}
        </a>
      </div>
    </td>
  );
}

export default ResultLibraryName;
