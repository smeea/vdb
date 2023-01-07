import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultLibraryName = ({ card }) => {
  return (
    <div className="inline text-fgName dark:text-fgNameDark space-x-1">
      <div className={`inline ${card.Banned ? 'line-through' : ''}`}>
        {card['Name']}
      </div>
      {card['Banned'] && (
        <div className="inline">
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </div>
      )}
    </div>
  );
};

export default ResultLibraryName;
