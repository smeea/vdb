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
      } align-items-center justify-content-between info-message`}
    >
      <div className={`d-inline ps-2 pe-1 ${isMobile ? '' : 'nowrap'}`}>
        <b>TOTAL: {total}</b>
      </div>
      <div className="d-block">
        {Object.keys(byYear).map((k) => {
          return (
            <span key={k} className="d-inline-block nowrap px-2">
              <span className="blue">
                <b>{k}: </b>
              </span>
              {byYear[k]}
            </span>
          );
        })}
      </div>
      <div className="d-flex justify-content-end">
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
