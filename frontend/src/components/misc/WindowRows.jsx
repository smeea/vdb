import React from 'react';

const WindowRows = ({ index, style, data }) => {
  return (
    <div
      style={style}
      className={`flex border-b border-bgSecondary dark:border-bgSecondaryDark ${
        index % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {data[index]}
    </div>
  );
};

export default WindowRows;
