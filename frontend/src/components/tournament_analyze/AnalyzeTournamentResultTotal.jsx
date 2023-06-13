import React from 'react';
import { SortButton } from '@/components';
import { useApp } from '@/context';

const AnalyzeTournamentResultTotal = ({
  results,
  sortMethods,
  sortMethod,
  setSortMethod,
}) => {
  const { isMobile } = useApp();
  const byRank = {};
  let total = 0;

  results.map((deck) => {
    const rank = deck.score.rank;
    if (byRank[rank]) {
      byRank[rank] += 1;
    } else {
      byRank[rank] = 1;
    }
    total += 1;
  });

  return (
    <div
      className={`${
        isMobile && Object.keys(byRank).length > 10 ? 'block' : 'flex'
      } items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark sm:space-x-2`}
    >
      <div className="whitespace-nowrap p-2 font-bold">TOTAL: {total}</div>
      <div>
        {Object.keys(byRank).map((i) => {
          return (
            <div key={i} className="inline-block whitespace-nowrap px-2">
              <div className="inline pr-0.5 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                {i}:
              </div>
              {byRank[i]}
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
export default AnalyzeTournamentResultTotal;
