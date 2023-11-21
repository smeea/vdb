import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';

const ResultLibraryName = ({ card, colored = true, isBanned }) => {
  return (
    <div
      className={`inline space-x-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div
        className={`inline ${card.Banned || isBanned ? 'line-through' : ''}`}
      >
        {card['Name']}
      </div>
      {(card.Banned || isBanned) && (
        <div className="inline whitespace-nowrap">
          {card.Banned ? (
            <>
              [{card.Banned} <Hammer className="inline h-[20px]" />]
            </>
          ) : (
            <>[Limited]</>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultLibraryName;
