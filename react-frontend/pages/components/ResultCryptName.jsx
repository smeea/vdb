import React from 'react';

function ResultCryptName(props) {
  return (
    <td className='name'>
      {props.value} {props.adv && ' [ADV]'} {props.ban && ' [BANNED]'}
    </td>
  );
}

export default ResultCryptName;
