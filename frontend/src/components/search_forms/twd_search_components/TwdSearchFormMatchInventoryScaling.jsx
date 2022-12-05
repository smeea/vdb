import React from 'react';

const TwdSearchFormMatchInventoryScaling = ({ value, target, onChange }) => {
  return (
    <input
      type="checkbox"
      id={target}
      htmlFor={target}
      name={target}
      label={`Scale to ${target} cards`}
      checked={value === target}
      onChange={onChange}
    />
  );
};

export default TwdSearchFormMatchInventoryScaling;
