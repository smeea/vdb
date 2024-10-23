import React from 'react';
import { twMerge } from 'tailwind-merge';

const FlexGapped = ({ className, children }) => {
  return (
    <div className={twMerge('flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8', className)}>{children}</div>
  );
};

export default FlexGapped;
