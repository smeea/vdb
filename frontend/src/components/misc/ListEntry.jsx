import React from 'react';
import { twMerge } from 'tailwind-merge';

const ListEntry = ({ icon, title, children, forceNewLine, forceOneLine, basis = 4 }) => {
  const basises = {
    2: ['basis-1/2', 'basis-1/2'],
    3: ['basis-1/3', 'basis-2/3'],
    4: ['basis-1/4', 'basis-3/4'],
  };

  return (
    <div
      className={twMerge(
        'flex gap-2 sm:gap-4',
        forceOneLine
          ? ''
          : forceNewLine
            ? 'flex-col'
            : 'max-sm:flex-col sm:items-center sm:justify-between',
      )}
    >
      <div
        className={twMerge(
          'flex items-center space-x-2 text-lg text-fgSecondary dark:text-fgSecondaryDark',
          !forceNewLine && basises[basis][0],
        )}
      >
        {icon && <div className="flex min-w-[23px] justify-center">{icon}</div>}
        <div className="flex whitespace-nowrap font-bold">{title}</div>
      </div>
      <div className={twMerge('flex items-center', !forceNewLine && basises[basis][1])}>
        {children}
      </div>
    </div>
  );
};

export default ListEntry;
