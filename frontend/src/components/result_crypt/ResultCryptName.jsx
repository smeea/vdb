import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultCryptName = ({ card }) => {
  return (
    <div className="inline whitespace-nowrap">
      {card['Banned'] ? (
        <div className="inline whitespace-normal">
          <strike>{card['Name']}</strike>
        </div>
      ) : (
        <div className="inline whitespace-normal">{card['Name']}</div>
      )}
      {card.Adv[0] && (
        <span className="pl-1">
          <img
            className="advanced-image-results inline h-[22px] align-text-bottom"
            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
            title="Advanced"
          />
        </span>
      )}
      {card['Banned'] && (
        <span className="pl-1">
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </span>
      )}
    </div>
  );
};

export default ResultCryptName;
