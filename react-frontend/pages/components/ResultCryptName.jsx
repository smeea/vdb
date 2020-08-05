import React from 'react';

function ResultCryptName(props) {
  return (
    <td className='name'>
      <div onClick={() => props.toggleHidden(props.id)}>
        {props.value} {props.adv && ' [ADV]'} {props.ban && ' [BANNED]'}
      </div>
    </td>
  );
}

export default ResultCryptName;
