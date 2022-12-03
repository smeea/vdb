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
      } items-center justify-between info-message`}
    >
      <div className={`inline ps-2 pe-1 ${isMobile ? '' : 'whitespace-nowrap'}`}>
        <b>TOTAL: {total}</b>
      </div>
      <div className="block">
        {Object.keys(byYear).map((k) => {
          return (
            <span key={k} className="inline-block whitespace-nowrap px-2">
              <span className="blue">
                <b>{k}: </b>
              </span>
              {byYear[k]}
            </span>
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
