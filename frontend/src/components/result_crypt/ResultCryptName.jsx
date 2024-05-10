import React from 'react';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';
import { BANNED, LEGAL, PLAYTEST } from '@/utils/constants';

const ResultCryptName = ({ card, colored = true, isBanned }) => {
  const legalRestriction = getLegality(card);

  return (
    <div
      className={`inline whitespace-nowrap space-x-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div className={`inline whitespace-normal ${card.Banned || isBanned ? 'line-through' : ''}`}>
        {card['Name']}
      </div>
      {card.Adv[0] && (
        <div className="inline whitespace-nowrap">
          <img
            className="inline mb-1"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
            width="12"
          />
        </div>
      )}
      {card.Banned && <ResultLegalIcon type={BANNED} value={card.Banned} />}
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
