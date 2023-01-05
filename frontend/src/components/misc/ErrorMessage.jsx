import React from 'react';

const ErrorMessage = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-bgError dark:bg-bgErrorDark border border-borderPrimary dark:border-borderPrimaryDark py-2 font-bold">
      {children}
    </div>
  );
};

export default ErrorMessage;
