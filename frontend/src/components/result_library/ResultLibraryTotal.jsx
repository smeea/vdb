import React from 'react';
import X from '@/assets/images/icons/x.svg?react';
import { Button, ResultLibraryTypeImage, SortButton, Header } from '@/components';
import { setLibraryCompare } from '@/context';
import { TYPE } from '@/constants';

const ResultLibraryTotal = ({
  cards,
  sortMethods,
  sortMethod,
  setSortMethod,
  inCompare,
  inHoF,
}) => {
  const byTypes = {};
  let total = 0;

  cards.map((card) => {
    if (byTypes[card[TYPE]]) {
      byTypes[card[TYPE]] += 1;
    } else {
      byTypes[card[TYPE]] = 1;
    }
    total += 1;
  });

  return (
    <Header>
      <div className="whitespace-nowrap p-2 font-bold">
        {inHoF ? 'LIBRARY' : inCompare ? 'COMPARE' : 'TOTAL'}: {total}
      </div>
      <div className={Object.keys(byTypes).length > 3 ? '' : 'flex items-center'}>
        {Object.keys(byTypes).map((k) => {
          return (
            <div key={k} className="inline-block whitespace-nowrap px-2">
              <div className="flex items-center gap-0.5">
                <ResultLibraryTypeImage value={k} />
                {byTypes[k]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex">
        {!inCompare ? (
          <SortButton
            sortMethods={sortMethods}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        ) : (
          <div>
            <Button title="Clear Compare" onClick={() => setLibraryCompare(undefined)}>
              <X width="16" height="20" viewBox="0 0 16 16" />
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
};

export default ResultLibraryTotal;
