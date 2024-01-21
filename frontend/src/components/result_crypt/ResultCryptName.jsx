import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';

const ResultCryptName = ({ card, colored = true, isBanned }) => {
  const legalRestriction = getLegality(card);

  return (
    <div
      className={`inline space-x-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div className="inline space-x-1 whitespace-nowrap">
        <div
          className={`inline space-x-1 whitespace-normal ${
            card.Banned || isBanned ? 'line-through' : ''
          }`}
        >
          {card['Name']}
        </div>
        {card.Adv[0] && (
          <img
            className="inline h-[25px] items-center pb-1"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
          />
        )}
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
      {legalRestriction && <ResultLegalIcon value={legalRestriction} />}
    </div>
  );
};

export default ResultCryptName;
