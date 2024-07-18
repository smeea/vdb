import React from 'react';
import { TwdResultCryptTable, TwdResultLibraryKeyCardsTable, TwdResultTags } from '@/components';

const BubbleChartTooltip = ({ active, payload }) => {
  const value = payload?.[0]?.payload;

  return (
    <div
      className={`z-50 flex flex-col gap-0.5 rounded-md border border-bgSecondary bg-bgPrimary p-1 text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark`}
    >
      {active && (
        <div className="flex flex-col gap-2 p-1">
          <div className="flex items-center justify-between">
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">{value.clan}</div>
            <div className="flex gap-2">
              {value.tags && (value.tags.superior.length > 0 || value.tags.base.length > 0) && (
                <TwdResultTags tags={value.tags} />
              )}
              <div className="flex items-center rounded-lg border px-2 py-0.5 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                # {value.rank}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <TwdResultCryptTable crypt={value.crypt} />
            <TwdResultLibraryKeyCardsTable withHeader library={value.library} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleChartTooltip;
