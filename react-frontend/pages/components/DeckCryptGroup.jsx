import React from 'react';

function DeckCryptGroup(props) {
  return (
    <td className='group'>
      <b>
        <font color='a0a0a0'>G</font>
        {props.value}
      </b>
    </td>
  );
}

export default DeckCryptGroup;
