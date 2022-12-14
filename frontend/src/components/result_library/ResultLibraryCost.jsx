import React from 'react';

const ResultLibraryCost = ({ valueBlood, valuePool }) => {
  if (valueBlood) {
    const imgSrc = `${process.env.ROOT_URL}images/misc/blood${valueBlood}.png`;
    const imgTitle = 'Blood Cost';
    const imgClass = 'cost-blood-image-results';
    return <img className={imgClass} src={imgSrc} title={imgTitle} />;
  } else {
    const imgSrc = `${process.env.ROOT_URL}images/misc/pool${valuePool}.png`;
    const imgTitle = 'Pool Cost';
    const imgClass = 'cost-pool-image-results';
    return <img className={imgClass} src={imgSrc} title={imgTitle} />;
  }
};

export default ResultLibraryCost;
