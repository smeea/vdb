import { twMerge } from 'tailwind-merge';
import { Header, SortButton } from '@/components';
import { CREATION_DATE } from '@/constants';
import { useApp } from '@/context';

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
      <div className="p-1 font-bold whitespace-nowrap sm:p-2">TOTAL: {results.length}</div>
      <div>
        {Object.keys(byYear)
          .toReversed()
          .map((i) => {
            return (
              <div key={i} className="inline-block px-2 whitespace-nowrap">
                <div className="text-fgSecondary dark:text-fgSecondaryDark inline pr-0.5 font-bold">
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
