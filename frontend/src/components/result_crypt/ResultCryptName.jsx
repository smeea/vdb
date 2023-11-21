import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';

const ResultCryptName = ({ card, colored = true, isBanned }) => {
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
            className="inline h-[22px] align-text-bottom"
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
    </div>
  );
};

export default ResultCryptName;
