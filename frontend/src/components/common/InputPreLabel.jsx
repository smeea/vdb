import React from 'react';

const InputPreLabel = ({ title, children }) => {
  return (
    <div
      className="flex items-center rounded-l border border-bgSecondary bg-bgSecondary p-2 text-fgThird dark:border-bgSecondaryDark dark:bg-bgSecondaryDark dark:text-fgThirdDark"
      title={title}
    >
      {children}
    </div>
  );
};

export default InputPreLabel;
