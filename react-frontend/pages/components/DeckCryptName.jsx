import React from 'react';

function DeckCryptName(props) {
  return (
    <td className='name'>
      <p>
        {props.value}
      </p>
    </td>
  );
}

export default DeckCryptName;
