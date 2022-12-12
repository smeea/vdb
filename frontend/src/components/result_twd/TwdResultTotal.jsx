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
      } info-message items-center justify-between`}
    >
      <div className={`px-2 inline  ${isMobile ? '' : 'whitespace-nowrap'}`}>
        <b>TOTAL: {total}</b>
      </div>
      <div className="block px-2 space-x-4">
        {Object.keys(byYear).map((k) => {
          return (
            <div key={k} className="inline-block whitespace-nowrap">
              <div className="inline text-blue font-bold">{k}: </div>
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
