import React from 'react';

const Hr = ({ isThick }) => {
  return (
    <hr
      className={`text-bgSecondary dark:text-bgSecondaryDark ${
        isThick ? 'border-2' : ''
      }`}
    />
  );
};

export default Hr;
