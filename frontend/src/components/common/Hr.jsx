import React from 'react';
import { twMerge } from 'tailwind-merge';

const Hr = ({ isThick, isLight }) => {
  return (
    <hr
      className={twMerge(
        isLight
          ? 'text-borderPrimary dark:text-borderPrimaryDark'
          : 'text-bgSecondary dark:text-bgSecondaryDark',
        isThick && 'border-2',
      )}
    />
  );
};

export default Hr;
