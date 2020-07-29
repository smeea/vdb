import React from 'react';

function ResultCryptName(props) {
  return (
    <td className='name'>
      <p>
        {props.value}
      </p>
    </td>
  );
}

export default ResultCryptName;
