import React from 'react';

const Title = ({ center, children }) => {
  return (
    <div
      className={`flex text-xl font-bold text-fgSecondary underline dark:text-fgSecondaryDark ${
        center ? 'justify-center' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Title;
