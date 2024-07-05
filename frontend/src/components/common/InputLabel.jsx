import React from 'react';

const InputLabel = ({ title, className = '', isLast = false, children }) => {
  return (
    <div
      className={`flex border-borderSecondary dark:border-borderSecondaryDark items-center ${
        isLast ? 'rounded-r' : 'rounded-l'
      } border border-bgSecondary bg-bgSecondary p-2 text-fgFourth dark:border-bgSecondaryDark dark:bg-bgSecondaryDark dark:text-fgThirdDark ${className}`}
      title={title}
    >
      {children}
    </div>
  );
};

export default InputLabel;
