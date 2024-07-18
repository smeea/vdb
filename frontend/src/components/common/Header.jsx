import React from 'react';

const Header = ({ className = '', children }) => {
  return (
    <div
      className={`flex min-h-[38px] items-center justify-between bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark ${className}`}
    >
      {children}
    </div>
  );
};

export default Header;
