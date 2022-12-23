import React from 'react';

const ErrorOverlay = ({ placement, children }) => {
  return (
    <div
      className={`absolute whitespace-nowrap ${
        placement === 'bottom'
          ? 'top-11'
          : placement === 'top'
          ? 'bottom-11'
          : placement === 'left'
          ? 'right-12'
          : placement === 'right'
          ? 'left-12'
          : ''
      } rounded bg-bgError px-1.5 py-0.5 text-xs font-bold text-[#fff] dark:bg-bgErrorDark dark:text-fgPrimaryDark`}
    >
      {children}
    </div>
  );
};

export default ErrorOverlay;
