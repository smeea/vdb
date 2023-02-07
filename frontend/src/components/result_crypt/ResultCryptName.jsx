import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg';

const ResultCryptName = ({ card, colored = true }) => {
  return (
    <div
      className={`inline space-x-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div className="inline space-x-1 whitespace-nowrap">
        <div
          className={`inline space-x-1 whitespace-normal ${
            card.Banned ? 'line-through' : ''
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
      {card['Banned'] && (
        <div className="inline whitespace-nowrap">
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </div>
      )}
    </div>
  );
};

export default ResultCryptName;
