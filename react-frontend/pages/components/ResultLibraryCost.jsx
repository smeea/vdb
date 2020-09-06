import React from 'react';

function ResultLibraryCost(props) {
  const imgClass='cost-image-results';
  let imgSrc='';
  if (props.valueBlood) {
    imgSrc=process.env.ROOT_URL + 'images/misc/blood' + props.valueBlood + '.png';
  } else if (props.valuePool){
    imgSrc=process.env.ROOT_URL + 'images/misc/pool' + props.valuePool + '.png';
  }

  return (
    <td className='cost'>
      <img className={imgClass} src={imgSrc} />
    </td>
  );
}

export default ResultLibraryCost;
