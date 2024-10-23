import React from 'react';
import { twMerge } from 'tailwind-merge';

const Header = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        'flex min-h-[38px] items-center justify-between bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Header;
