import React from 'react';
import { ResultClanImage, ResultCryptGroup, ResultCryptTitle } from '@/components';

const ResultCryptClanGroupTitle = ({ card }) => {
  return (
    <>
      <div className="flex justify-center">
        <ResultClanImage value={card[CLAN]} />
      </div>
      <div className="flex justify-between gap-1 text-sm font-bold">
        <div className="text-fgSecondary dark:text-fgSecondaryDark">
          {card[TITLE] && <ResultCryptTitle value={card[TITLE]} />}
        </div>
        <ResultCryptGroup value={card[GROUP]} />
      </div>
    </>
  );
};

export default ResultCryptClanGroupTitle;
