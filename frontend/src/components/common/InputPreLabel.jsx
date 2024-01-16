import React from 'react';

const InputPreLabel = ({ title, className = '', children }) => {
  return (
    <div
      className={`flex border-borderSecondary dark:border-borderSecondaryDark items-center rounded-l border border-bgSecondary bg-bgSecondary p-2 text-fgFourth dark:border-bgSecondaryDark dark:bg-bgSecondaryDark dark:text-fgThirdDark ${className}`}
      title={title}
    >
      {children}
    </div>
  );
};

export default InputPreLabel;
