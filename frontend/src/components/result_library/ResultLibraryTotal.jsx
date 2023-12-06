import React from 'react';
import { Button } from '@/components';
import X from '@/assets/images/icons/x.svg?react';
import { ResultLibraryTypeImage, SortButton } from '@/components';
import { setLibraryCompare } from '@/context';

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
    if (byTypes[card.Type]) {
      byTypes[card.Type] += 1;
    } else {
      byTypes[card.Type] = 1;
    }
    total += 1;
  });

  return (
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      <div className="whitespace-nowrap p-2 font-bold">
        {inHoF ? 'LIBRARY' : inCompare ? 'COMPARE' : 'TOTAL'}: {total}
      </div>
      <div>
        {Object.keys(byTypes).map((k) => {
          return (
            <div key={k} className="inline-block whitespace-nowrap px-2">
              <div className="flex items-center space-x-1">
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
            <Button
              title="Clear Compare"
              variant="primary"
              onClick={() => setLibraryCompare(undefined)}
            >
              <X width="16" height="20" viewBox="0 0 16 16" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultLibraryTotal;
