import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultLibraryName = ({ card }) => {
  return (
    <>
      {card['Banned'] ? (
        <>
          <strike>{card['Name']}</strike> [{card['Banned']}{' '}
          <Hammer className="inline" />]
        </>
      ) : (
        <>{card['Name']}</>
      )}
    </>
  );
};

export default ResultLibraryName;
