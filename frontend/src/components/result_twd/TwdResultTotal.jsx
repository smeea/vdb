import React from 'react';
import { SortButton } from '@/components';
import { useApp } from '@/context';

const TwdResultTotal = ({
  results,
  sortMethods,
  sortMethod,
  setSortMethod,
}) => {
  const { isMobile } = useApp();
  const byYear = {};
  let total = 0;

  results.map((deck) => {
    const year = `'${deck['creation_date'].slice(2, 4)}`;
    if (byYear[year]) {
      byYear[year] += 1;
    } else {
      byYear[year] = 1;
    }
    total += 1;
  });

  return (
    <div
      className={`${
        isMobile && Object.keys(byYear).length > 10 ? 'block' : 'flex'
      } items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark sm:space-x-2`}
    >
      <div className="whitespace-nowrap p-2 font-bold">TOTAL: {total}</div>
      <div>
        {Object.keys(byYear).map((k) => {
          return (
            <div key={k} className="inline-block whitespace-nowrap px-2">
              <div className="inline pr-0.5 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                {k}:
              </div>
              {byYear[k]}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <SortButton
          sortMethod={sortMethod}
          sortMethods={sortMethods}
          setSortMethod={setSortMethod}
        />
      </div>
    </div>
  );
};
export default TwdResultTotal;
