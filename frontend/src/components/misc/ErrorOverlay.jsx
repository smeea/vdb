import React from 'react';

const ErrorOverlay = ({ placement, children }) => {
  console.log(children);

  return (
    <div
      className={`absolute ${
        placement === 'bottom'
          ? 'max-w-auto top-8'
          : placement === 'top'
          ? 'bottom-8'
          : placement === 'left'
          ? 'right-8'
          : placement === 'right'
          ? 'left-8'
          : ''
      } rounded bg-red-800 py-1 px-1.5 text-xs font-bold`}
    >
      {children}
    </div>
  );
};

export default ErrorOverlay;
