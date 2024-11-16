import React from 'react';
import { ResultClanImage, ResultCryptSect, ResultCryptGroup, ResultCryptTitle } from '@/components';
import { TITLE, CLAN, GROUP, SECT } from '@/constants';

const ResultCryptClanGroupTitle = ({ card }) => {
  return (
    <>
      <div className="flex justify-center">
        <ResultClanImage value={card[CLAN]} />
      </div>
      <div className="flex justify-between gap-1 text-sm font-bold">
        <div className="flex w-[16px] justify-center">
          {card[TITLE] ? (
            <ResultCryptTitle value={card[TITLE]} />
          ) : (
            <ResultCryptSect value={card[SECT]} />
          )}
        </div>
        <ResultCryptGroup value={card[GROUP]} />
      </div>
    </>
  );
};

export default ResultCryptClanGroupTitle;
