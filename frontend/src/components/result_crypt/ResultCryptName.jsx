import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';
import { ResultLegalIcon } from '@/components';
import { getLegality } from '@/utils';

const ResultCryptName = ({ card, colored = true, isBanned }) => {
  const legalRestriction = getLegality(card);

  return (
    <div
      className={`inline-flex gap-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div className="inline-flex gap-1 whitespace-nowrap">
        <div
          className={`inline-flex gap-1 whitespace-normal ${
            card.Banned || isBanned ? 'line-through' : ''
          }`}
        >
          {card['Name']}
        </div>
        {card.Adv[0] && (
          <img
            className="inline-flex items-center"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
            width="12"
          />
        )}
      </div>
      {(card.Banned || isBanned) && (
        <div className="inline-flex items-center whitespace-nowrap">
          {card.Banned ? (
            <>
              [{card.Banned}
              <Hammer width="15" height="15" viewBox="0 0 16 16" />]
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
