import React from 'react';
import {
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
} from '@/components';

const ResultCryptClanGroupTitle = ({ card }) => {
  return (
    <>
      <div className="flex justify-center">
        <ResultClanImage value={card.Clan} />
      </div>
      <div className="flex justify-between space-x-1 font-bold text-sm">
        <div className="text-fgSecondary dark:text-fgSecondaryDark">
          {card.Title && <ResultCryptTitle value={card.Title} />}
        </div>
        <ResultCryptGroup value={card.Group} />
      </div>
    </>
  );
};

export default ResultCryptClanGroupTitle;
