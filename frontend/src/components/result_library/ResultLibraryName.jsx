import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';

const ResultLibraryName = ({ card, colored = true, isBanned }) => {
  const isLegal = getLegality(card);

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
      {isLegal && <ResultLegalIcon value={isLegal} />}
    </div>
  );
};

export default ResultLibraryName;
