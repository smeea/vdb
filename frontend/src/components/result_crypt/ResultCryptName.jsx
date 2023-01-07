import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultCryptName = ({ card }) => {
  return (
    <div className="inline text-fgName dark:text-fgNameDark space-x-1">
      <div className="inline whitespace-nowrap space-x-1">
        <div
          className={`inline whitespace-normal space-x-1 ${
            card.Banned ? 'line-through' : ''
          }`}
        >
          {card['Name']}
        </div>
        {card.Adv[0] && (
          <img
            className="inline h-[22px] align-text-bottom"
            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
            title="Advanced"
          />
        )}
      </div>
      {card['Banned'] && (
        <div className="inline">
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </div>
      )}
    </div>
  );
};

export default ResultCryptName;
