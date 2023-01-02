import React from 'react';

const ResultLibraryCost = ({ valueBlood, valuePool }) => {
  if (valueBlood) {
    return (
      <img
        className="h-[30px] optimize-contrast"
        src={`${process.env.ROOT_URL}images/misc/blood${valueBlood}.png`}
        title="Blood Cost"
      />
    );
  } else {
    <img
      className="h-[35px] optimize-contrast"
      src={`${process.env.ROOT_URL}images/misc/pool${valuePool}.png`}
      title="Pool Cost"
    />;
  }
};

export default ResultLibraryCost;
