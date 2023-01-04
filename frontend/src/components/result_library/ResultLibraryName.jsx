import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultLibraryName = ({ card }) => {
  return (
    <div className="text-fgName dark:text-fgNameDark">
      {card['Banned'] ? (
        <>
          <strike>{card['Name']}</strike> [{card['Banned']}{' '}
          <Hammer className="inline" />]
        </>
      ) : (
        <>{card['Name']}</>
      )}
    </div>
  );
};

export default ResultLibraryName;
