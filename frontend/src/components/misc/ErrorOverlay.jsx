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
      } bg-red-800 text-xs font-bold py-1 px-1.5 rounded`}
    >
      {children}
    </div>
  );
};

export default ErrorOverlay;
