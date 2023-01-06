import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultLibraryName = ({ card }) => {
  return (
    <div className="flex">
      <div className="inline whitespace-nowrap text-fgName dark:text-fgNameDark">
        {card['Banned'] ? (
          <>
            <strike>{card['Name']}</strike> [{card['Banned']}{' '}
            <Hammer className="inline" />]
          </>
        ) : (
          <>{card['Name']}</>
        )}
      </div>
    </div>
  );
};

export default ResultLibraryName;
