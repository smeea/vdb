import React from 'react';

const FlexGapped = ({ className = '', children }) => {
  return (
    <div className={`flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8 ${className}`}>
      {children}
    </div>
  );
};

export default FlexGapped;
