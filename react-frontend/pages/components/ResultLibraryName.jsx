import React, { useState } from 'react';

function ResultLibraryName(props) {
  // const [isShown, setIsShown] = useState(false);

  return (
    <td className='name'>
      <div onClick={() => props.toggleHidden(props.id)}>
        <a
          /* onMouseEnter={() => setIsShown(true)} */
          /* onMouseLeave={() => setIsShown(false)} */
          href='#'>
          {props.value} {props.ban && ' [BANNED]'}
        </a>
        {/* {isShown && ( */}
        {/*   <span className='hover-library-img'> */}
        {/*     {props.value} */}
        {/*   </span> */}
        {/* )} */}
      </div>
    </td>
  );
}

export default ResultLibraryName;
