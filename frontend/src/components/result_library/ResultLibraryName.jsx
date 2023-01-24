import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultLibraryName = ({ card }) => {
  return (
    <div className="inline space-x-1 text-fgName dark:text-fgNameDark">
      <div className={`inline ${card.Banned ? 'line-through' : ''}`}>
        {card['Name']}
      </div>
      {card['Banned'] && (
        <div className="inline whitespace-nowrap">
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </div>
      )}
    </div>
  );
};

export default ResultLibraryName;
