import React from 'react';
import { SortButton } from 'components';
import { useApp } from 'context';

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
      className={`d-${
        isMobile && Object.keys(byYear).length > 10 ? 'block' : 'flex'
      } items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark`}
    >
      <div className={`inline px-2  ${isMobile ? '' : 'whitespace-nowrap'}`}>
        <b>TOTAL: {total}</b>
      </div>
      <div className="block space-x-4 px-2">
        {Object.keys(byYear).map((k) => {
          return (
            <div key={k} className="inline-block whitespace-nowrap">
              <div className="inline font-bold text-fgSecondary dark:text-fgSecondaryDark">
                {k}:{' '}
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
