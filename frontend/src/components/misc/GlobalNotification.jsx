import React from 'react';

const GlobalNotification = ({ children }) => {
  return (
    <nav
      className={`top-0 bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark
`}
    >
      <div className="flex w-full items-center justify-center gap-2 text-xl">
        {children}
      </div>
    </nav>
  );
};

export default GlobalNotification;
