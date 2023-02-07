import React from 'react';

const ErrorOverlay = ({ placement = 'bottom', children }) => {
  const getPlacement = (placement) => {
    switch (placement) {
      case 'bottom':
        return 'w-1/2 justify-center top-10 left-1/4';
      case 'top':
        return 'bottom-10';
      case 'left':
        return 'right-12';
      case 'right':
        return 'left-12';
    }
  };

  const placementStyle = getPlacement(placement);

  return (
    <div className={`absolute z-10 flex items-center ${placementStyle}`}>
      <div className="inline whitespace-nowrap rounded bg-bgError px-1.5 py-0.5 text-sm font-bold text-white dark:bg-bgErrorDark dark:text-fgPrimaryDark">
        {children}
      </div>
    </div>
  );
};

export default ErrorOverlay;
