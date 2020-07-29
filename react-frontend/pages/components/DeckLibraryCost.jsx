import React from 'react';

import blood1 from './../../assets/images/misc/blood1.png';
import blood2 from './../../assets/images/misc/blood2.png';
import blood3 from './../../assets/images/misc/blood3.png';
import blood4 from './../../assets/images/misc/blood4.png';
import blood5 from './../../assets/images/misc/blood5.png';
import blood6 from './../../assets/images/misc/blood6.png';
import bloodx from './../../assets/images/misc/bloodx.png';

import pool1 from './../../assets/images/misc/pool1.png';
import pool2 from './../../assets/images/misc/pool2.png';
import pool3 from './../../assets/images/misc/pool3.png';
import pool4 from './../../assets/images/misc/pool4.png';
import pool5 from './../../assets/images/misc/pool5.png';
import pool6 from './../../assets/images/misc/pool6.png';
import poolx from './../../assets/images/misc/poolx.png';

function DeckLibraryCost(props) {
  const costicons = {
    1: [blood1, pool1],
    2: [blood2, pool2],
    3: [blood3, pool3],
    4: [blood4, pool4],
    5: [blood5, pool5],
    6: [blood6, pool6],
    X: [bloodx, poolx],
  };
  const imgClass='cost-image-results';
  let imgSrc='';
  if (props.valueBlood) {
    imgSrc=costicons[props.valueBlood][0];
  } else if (props.valuePool){
    imgSrc=costicons[props.valuePool][1];
  }

  return (
    <td className='cost'>
      <img className={imgClass} src={imgSrc} />
    </td>
  );
}

export default DeckLibraryCost;
