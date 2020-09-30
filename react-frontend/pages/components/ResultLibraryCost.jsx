import React from 'react';

function ResultLibraryCost(props) {
  const imgClass = 'cost-image-results';
  let imgSrc = '';
  let imgTitle = '';
  if (props.valueBlood) {
    imgSrc =
      process.env.ROOT_URL + 'images/misc/blood' + props.valueBlood + '.png';
    imgTitle = 'Blood Cost';
  } else if (props.valuePool) {
    imgSrc =
      process.env.ROOT_URL + 'images/misc/pool' + props.valuePool + '.png';
    imgTitle = 'Pool Cost';
  }

  return (
    <span className="cost">
      {(props.valueBlood || props.valuePool) && (
        <img className={imgClass} src={imgSrc} title={imgTitle} />
      )}
    </span>
  );
}

export default ResultLibraryCost;
