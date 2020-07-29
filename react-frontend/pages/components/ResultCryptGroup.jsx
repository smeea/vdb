import React from 'react';

function ResultCryptGroup(props) {
  return (
    <td className='group'>
      <b>
        <font color='a0a0a0'>G</font>
        {props.value}
      </b>
    </td>
  );
}

export default ResultCryptGroup;
