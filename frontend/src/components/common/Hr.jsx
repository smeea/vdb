import React from 'react';

const Hr = ({ isThick, isLight }) => {
  return (
    <hr
      className={`${
        isLight
          ? 'text-borderPrimary dark:text-borderPrimaryDark'
          : 'text-bgSecondary dark:text-bgSecondaryDark'
      } ${isThick ? 'border-2' : ''}`}
    />
  );
};

export default Hr;
