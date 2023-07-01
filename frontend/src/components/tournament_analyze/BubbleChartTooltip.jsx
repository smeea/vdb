import React from 'react';
import {
  TwdResultCryptTable,
  TwdResultLibraryKeyCardsTable,
  TwdResultTags,
} from '@/components';

const BubbleChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].payload;

    return (
      <div
        className={`z-50 flex flex-col gap-0.5 rounded-md border border-bgSecondary bg-bgPrimary p-1 text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark`}
      >
        <div className="flex flex-col gap-2 p-1">
          <div className="flex items-center justify-between text-fgSecondary dark:text-fgSecondaryDark">
            <div />
            <div className="font-bold">{value.clan}</div>
            <div className="rounded-lg border px-2 py-0.5">
              <b># {value.rank}</b>
            </div>
          </div>
          <div className="flex text-sm gap-2">
            <TwdResultCryptTable crypt={value.crypt} />
            <TwdResultLibraryKeyCardsTable withHeader library={value.library} />
          </div>
        </div>
        {value.tags &&
          (value.tags.superior.length > 0 || value.tags.base.length > 0) && (
            <TwdResultTags tags={value.tags} />
          )}
      </div>
    );
  }

  return null;
};

export default BubbleChartTooltip;
