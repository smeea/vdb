import React from 'react';
import { twMerge } from 'tailwind-merge';
import { SortButton, Header } from '@/components';
import { useApp } from '@/context';
import { CREATION_DATE } from '@/constants';

const TwdResultTotal = ({ results, sortMethods, sortMethod, setSortMethod }) => {
  const { isMobile } = useApp();
  const byYear = {};

  results.forEach((deck) => {
    const year = deck[CREATION_DATE].slice(0, 4);
    byYear[year] = byYear[year] ? byYear[year] + 1 : 1;
  });

  return (
    <Header
      className={twMerge(
        'sm:space-x-2',
        isMobile && Object.keys(byYear).length > 10 ? 'block' : 'flex',
      )}
    >
      <div className="whitespace-nowrap p-2 font-bold">TOTAL: {results.length}</div>
      <div>
        {Object.keys(byYear)
          .toReversed()
          .map((i) => {
            return (
              <div key={i} className="inline-block whitespace-nowrap px-2">
                <div className="inline pr-0.5 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                  '{i.slice(2, 4)}:
                </div>
                {byYear[i]}
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
    </Header>
  );
};
export default TwdResultTotal;
