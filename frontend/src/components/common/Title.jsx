import React from 'react';
import { twMerge } from 'tailwind-merge';

const Title = ({ center, id, children }) => {
  return (
    <div
      id={id}
      className={twMerge(
        'flex text-xl font-bold text-fgFourth underline dark:text-fgSecondaryDark',
        center && 'justify-center',
      )}
    >
      {children}
    </div>
  );
};

export default Title;
