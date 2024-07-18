import React from 'react';

const ErrorMessage = ({ children }) => {
  return (
    <div className="flex basis-full items-center justify-center border border-bgRed bg-bgError p-2 font-bold text-white dark:border-bgRedDark dark:bg-bgErrorDark dark:text-whiteDark">
      {children}
    </div>
  );
};

export default ErrorMessage;
