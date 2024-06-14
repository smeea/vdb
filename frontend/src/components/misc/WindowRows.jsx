import React from 'react';

const WindowRows = ({ index, style, data }) => {
  return (
    <div
      style={style}
      className="flex border-b border-bgSecondary dark:border-bgSecondaryDark row-bg"
    >
      {data[index]}
    </div>
  );
};

export default WindowRows;
