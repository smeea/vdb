import React from 'react';

const Header = ({ height = 'min-h-[38px]', className = '', children }) => {
  return (
    <div
      className={`flex ${height} items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark text-fgSecondary dark:text-fgPrimaryDark ${className}`}
    >
      {children}
    </div>
  );
};

export default Header;
