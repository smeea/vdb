import React from 'react';

const WindowRows = ({ index, style, data }) => {
  return (
    <div
      style={style}
      className="row-bg flex border-b border-bgSecondary dark:border-bgSecondaryDark"
    >
      {data[index]}
    </div>
  );
};

export default WindowRows;
