import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

const ResultCryptName = ({ card }) => {
  return (
    <div className="inline whitespace-nowrap text-fgName dark:text-fgNameDark">
      <div className="inline whitespace-normal ">
        {card['Banned'] ? <strike>{card['Name']}</strike> : <>{card['Name']}</>}
      </div>
      {card.Adv[0] && (
        <>
          {' '}
          <img
            className="inline h-[22px] align-text-bottom"
            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
            title="Advanced"
          />
        </>
      )}
      {card['Banned'] && (
        <>
          {' '}
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </>
      )}
    </div>
  );
};

export default ResultCryptName;
