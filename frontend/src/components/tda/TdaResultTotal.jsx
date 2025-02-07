import { twMerge } from 'tailwind-merge';
import { SortButton } from '@/components';
import { BASE, RANK, SCORE, SUPERIOR, TAGS } from '@/constants';
import { useApp } from '@/context';

const TdaResultTotal = ({ results, sortMethods, sortMethod, setSortMethod }) => {
  const { isMobile } = useApp();
  const byRank = {};
  const byTags = {};
  let totalRank = 0;

  results.forEach((deck) => {
    const rank = deck[SCORE][RANK];
    totalRank += rank;

    if (byRank[rank]) {
      byRank[rank] += 1;
    } else {
      byRank[rank] = 1;
    }

    [...deck[TAGS][SUPERIOR], ...deck[TAGS][BASE]].forEach((t) => {
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
        'bg-bgSecondary dark:bg-bgSecondaryDark items-center justify-between sm:space-x-2',
      )}
    >
      <div className="flex flex-col gap-1 p-2">
        <div className="font-bold whitespace-nowrap">TOTAL: {results.length}</div>
        <div className="font-bold sm:whitespace-nowrap">
          AVG. PLACE: {Math.round((totalRank / results.length) * 10) / 10}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <div className="text-fgSecondary dark:text-fgSecondaryDark inline px-2 font-bold">
            Places:
          </div>
          {Object.keys(byRank).map((i) => {
            return (
              <div key={i} className="group inline-block px-2 whitespace-nowrap">
                {i}
                <div className="inline group-last:hidden">,</div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="text-fgSecondary dark:text-fgSecondaryDark inline px-2 font-bold">
            Tags:
          </div>
          {Object.keys(byTags).map((i) => {
            return (
              <div key={i} className="inline-block px-2 whitespace-nowrap">
                <div className="text-fgSecondary dark:text-fgSecondaryDark inline pr-0.5">{i}:</div>
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
export default TdaResultTotal;
