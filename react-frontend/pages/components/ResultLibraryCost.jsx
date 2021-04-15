import React from 'react';

function ResultLibraryCost(props) {
  let imgClass = '';
  let imgSrc = '';
  let imgTitle = '';
  if (props.valueBlood) {
    imgSrc = `${process.env.ROOT_URL}images/misc/blood${props.valueBlood}.png`;
    imgTitle = 'Blood Cost';
    imgClass = 'cost-blood-image-results';
  } else if (props.valuePool) {
    imgSrc = `${process.env.ROOT_URL}images/misc/pool${props.valuePool}.png`;
    imgTitle = 'Pool Cost';
    imgClass = 'cost-pool-image-results';
  }

  return (
    <span>
      {(props.valueBlood || props.valuePool) && (
        <img className={imgClass} src={imgSrc} title={imgTitle} />
      )}
    </span>
  );
}

export default ResultLibraryCost;
