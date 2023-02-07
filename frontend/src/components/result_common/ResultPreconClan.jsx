import React from 'react';
import GiftFill from '@/assets/images/icons/gift-fill.svg';
import { ResultLibraryClan } from '@/components';

const ResultPreconClan = ({ clan }) => {
  return (
    <>
      {clan === 'Bundle' ? (
        <div className="flex items-center h-[21px] dark:brightness-[0.65] sm:h-[24px]">
          <GiftFill />
        </div>
      ) : clan === 'Mix' ? null : (
        <ResultLibraryClan value={clan} />
      )}
    </>
  );
};

export default ResultPreconClan;
