import React from 'react';

const WindowRows = ({ index, style, data }) => {
  return (
    <div
      style={style}
      className="flex border-b border-bgSecondary dark:border-bgSecondaryDark bg-bgPrimary dark:bg-bgPrimaryDark even:bg-bgThird even:dark:bg-bgThirdDark"
    >
      {data[index]}
    </div>
  );
};

export default WindowRows;
