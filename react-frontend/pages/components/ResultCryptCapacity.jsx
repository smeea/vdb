import React from 'react';

import cap1 from './../../assets/images/misc/cap1.png';
import cap2 from './../../assets/images/misc/cap2.png';
import cap3 from './../../assets/images/misc/cap3.png';
import cap4 from './../../assets/images/misc/cap4.png';
import cap5 from './../../assets/images/misc/cap5.png';
import cap6 from './../../assets/images/misc/cap6.png';
import cap7 from './../../assets/images/misc/cap7.png';
import cap8 from './../../assets/images/misc/cap8.png';
import cap9 from './../../assets/images/misc/cap9.png';
import cap10 from './../../assets/images/misc/cap10.png';
import cap11 from './../../assets/images/misc/cap11.png';

function ResultCryptCapacity(props) {
  const capicons = {
    1: cap1,
    2: cap2,
    3: cap3,
    4: cap4,
    5: cap5,
    6: cap6,
    7: cap7,
    8: cap8,
    9: cap9,
    10: cap10,
    11: cap11,
  };
  const imgClass='capacity-image-results';
  const imgSrc=capicons[props.value];

  return (
    <td className='capacity'>
      <img className={imgClass} src={imgSrc} />
    </td>
  );
}

export default ResultCryptCapacity;
