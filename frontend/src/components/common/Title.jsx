import React from 'react';

const Title = ({ center, id, children }) => {
  return (
    <div
      id={id}
      className={`flex text-xl font-bold text-fgFourth underline dark:text-fgSecondaryDark ${
        center ? 'justify-center' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Title;
