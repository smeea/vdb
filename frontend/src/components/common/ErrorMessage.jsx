import React from 'react';

const ErrorMessage = ({ children }) => {
  return (
    <div className="flex basis-full items-center justify-center border border-borderPrimary bg-bgError p-2 font-bold dark:border-borderPrimaryDark dark:bg-bgErrorDark">
      {children}
    </div>
  );
};

export default ErrorMessage;
