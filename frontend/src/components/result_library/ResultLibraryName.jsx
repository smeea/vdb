import React from 'react';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';
import { BANNED, LEGAL } from '@/utils/constants';

const ResultLibraryName = ({ card, colored = true, isBanned }) => {
  const legalRestriction = getLegality(card);

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
            <ResultLegalIcon type={BANNED} value={card.Banned} />
          ) : (
            <>[Limited]</>
          )}
        </div>
      )}
      {legalRestriction && (
        <ResultLegalIcon type={LEGAL} value={legalRestriction} />
      )}
    </div>
  );
};

export default ResultLibraryName;
