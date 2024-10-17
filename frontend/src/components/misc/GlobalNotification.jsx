import React from 'react';

const GlobalNotification = ({ children }) => {
  return (
    <nav className="top-0 bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark">
      <div className="flex w-full items-center justify-center gap-2 text-xl">{children}</div>
    </nav>
  );
};

export default GlobalNotification;
