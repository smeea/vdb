import React from 'react';

const ResultLibraryCost = ({ valueBlood, valuePool }) => {
  if (valueBlood) {
    return (
      <>
        <img
          className="optimize-contrast h-[30px]"
          src={`${process.env.ROOT_URL}images/misc/blood${valueBlood}.png`}
          title="Blood Cost"
        />
      </>
    );
  } else {
    return (
      <img
        className="optimize-contrast h-[35px]"
        src={`${process.env.ROOT_URL}images/misc/pool${valuePool}.png`}
        title="Pool Cost"
      />
    );
  }
};

export default ResultLibraryCost;
