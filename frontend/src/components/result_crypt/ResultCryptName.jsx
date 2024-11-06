import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';
import { BANNED, LEGAL, PLAYTEST } from '@/constants';

const ResultCryptName = ({ card, colored = true, isBanned }) => {
  const legalRestriction = getLegality(card);

  return (
    <div
      className={twMerge(
        'inline space-x-1 whitespace-nowrap print:dark:text-fgName',
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
      {card[ADV][0] && (
        <div className="inline whitespace-nowrap">
          <img
            className="mb-1 inline"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
            width="12"
          />
        </div>
      )}
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

export default ResultCryptName;
