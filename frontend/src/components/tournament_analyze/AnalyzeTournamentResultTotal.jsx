import React from 'react';
import { twMerge } from 'tailwind-merge';
import { SortButton } from '@/components';
import { useApp } from '@/context';

const AnalyzeTournamentResultTotal = ({ results, sortMethods, sortMethod, setSortMethod }) => {
  const { isMobile } = useApp();
  const byRank = {};
  const byTags = {};
  let totalRank = 0;

  results.forEach((deck) => {
    const rank = deck.score[RANK];
    totalRank += rank;

    if (byRank[rank]) {
      byRank[rank] += 1;
    } else {
      byRank[rank] = 1;
    }

    [...deck[TAGS].superior, ...deck[TAGS].base].forEach((t) => {
      if (byTags[t]) {
        byTags[t] += 1;
      } else {
        byTags[t] = 1;
      }
    });
  });

  return (
    <div
      className={twMerge(
        isMobile && Object.keys(byRank).length > 10 ? 'block' : 'flex',
        'items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark sm:space-x-2',
      )}
    >
      <div className="flex flex-col gap-1 p-2">
        <div className="whitespace-nowrap font-bold">TOTAL: {results.length}</div>
        <div className="font-bold sm:whitespace-nowrap">
          AVG. PLACE: {Math.round((totalRank / results.length) * 10) / 10}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <div className="inline px-2 font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Places:
          </div>
          {Object.keys(byRank).map((i, idx) => {
            return (
              <div key={i} className="inline-block whitespace-nowrap px-2">
                {i}
                {idx < Object.keys(byRank).length - 1 && ','}
              </div>
            );
          })}
        </div>
        <div>
          <div className="inline px-2 font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Playstyles:
          </div>
          {Object.keys(byTags).map((i) => {
            return (
              <div key={i} className="inline-block whitespace-nowrap px-2">
                <div className="inline pr-0.5 text-fgSecondary dark:text-fgSecondaryDark">{i}:</div>
                {byTags[i]}
              </div>
            );
          })}
        </div>
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
