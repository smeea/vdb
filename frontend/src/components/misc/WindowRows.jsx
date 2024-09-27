import React from 'react';

const WindowRows = ({ index, style, data }) => {
  return (
    <div
      style={style}
      className={`${index % 2 ? 'bg-bgThird dark:bg-bgThirdDark' : 'bg-bgPrimary dark:bg-bgPrimaryDark'} flex border-b border-bgSecondary dark:border-bgSecondaryDark`}
    >
      {data[index]}
    </div>
  );
};

export default WindowRows;
