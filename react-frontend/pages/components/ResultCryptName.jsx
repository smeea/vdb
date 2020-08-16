import React, { useState } from 'react';


function ResultCryptName(props) {
  const [isShown, setIsShown] = useState(false);

  return (
    <td className='name'>
      <div onClick={() => props.toggleHidden(props.id)}>
        <a
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          href='#'>
          {props.value} {props.adv && ' [ADV]'} {props.ban && ' [BANNED]'}
        </a>
        {isShown && (
          <span className='hover-crypt-img'>
            {props.value}
          </span>
        )}
      </div>
    </td>
  );
}

export default ResultCryptName;
