import React from 'react';
import XIcon from '@icons/x.svg?react';
import InfoCircle from '@icons/info-circle.svg?react';
import { ANY } from '@/constants';
import { Button, SortButton, Header } from '@/components';
import { setCryptCompare } from '@/context';
import { X, GROUP, CAPACITY } from '@/constants';

const ResultCryptTotal = ({
  cards,
  sortMethods,
  sortMethod,
  setSortMethod,
  toggleShowInfo,
  inCompare,
  inHoF,
}) => {
  const byGroups = {};
  const byGroupsCapacityTotal = {};
  let total = 0;

  cards.map((card) => {
    if (byGroups[card[GROUP]]) {
      byGroups[card[GROUP]] += 1;
    } else {
      byGroups[card[GROUP]] = 1;
    }
    if (byGroupsCapacityTotal[card[GROUP]]) {
      byGroupsCapacityTotal[card[GROUP]] += card[CAPACITY];
    } else {
      byGroupsCapacityTotal[card[GROUP]] = card[CAPACITY];
    }
    total += 1;
  });

  return (
    <Header>
      <div className="p-1 font-bold whitespace-nowrap sm:p-2">
        {inHoF ? 'CRYPT' : inCompare ? 'COMPARE' : 'TOTAL'}: {total}
      </div>
      <div>
        {Object.keys(byGroups).map((k) => {
          return (
            <div key={k} className="inline-block px-2 whitespace-nowrap">
              <div className="text-fgSecondary dark:text-fgSecondaryDark inline pr-0.5 font-bold">
                G{k == ANY ? X : k}:
              </div>
              {byGroups[k]}
              {!inHoF && (
                <div className="flex justify-center text-sm" title="Average Capacity">
                  ~{Math.round((byGroupsCapacityTotal[k] / byGroups[k]) * 10) / 10}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={inCompare ? 'flex' : ''}>
        {inCompare ? (
          <div>
            <Button title="Clear Compare" onClick={() => setCryptCompare(undefined)}>
              <XIcon width="16" height="20" viewBox="0 0 16 16" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {!inHoF && (
              <div className="flex justify-end">
                <Button title="Additional Info" onClick={() => toggleShowInfo()}>
                  <InfoCircle />
                </Button>
              </div>
            )}
            <SortButton
              sortMethod={sortMethod}
              sortMethods={sortMethods}
              setSortMethod={setSortMethod}
            />
          </div>
        )}
      </div>
    </Header>
  );
};

export default ResultCryptTotal;
