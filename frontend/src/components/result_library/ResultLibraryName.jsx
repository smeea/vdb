import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';
import { NAME, BANNED, LEGAL, PLAYTEST } from '@/constants';

const ResultLibraryName = ({ card, colored = true, isBanned }) => {
  const legalRestriction = getLegality(card);

  return (
    <div
      className={twMerge(
        'inline space-x-1 whitespace-nowrap',
        colored && 'text-fgName dark:text-fgNameDark',
      )}
    >
      <div
        className={twMerge(
          'inline whitespace-normal',
          (card[BANNED] || isBanned) && 'line-through',
        )}
      >
        {card[NAME]}
      </div>
      {card[BANNED] && <ResultLegalIcon type={BANNED} value={card[BANNED]} />}
      {isBanned && <>[Limited]</>}
      {legalRestriction && (
        <ResultLegalIcon
          type={legalRestriction === PLAYTEST ? PLAYTEST : LEGAL}
          value={legalRestriction}
        />
      )}
    </div>
  );
};

export default ResultLibraryName;
