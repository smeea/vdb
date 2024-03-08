import React from 'react';
import { useSnapshot } from 'valtio';
import { AccountLimitedSet } from '@/components';
import { limitedSetChange, limitedFullStore } from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { PLAYTEST } from '@/utils/constants';

const AccountLimitedSetSelection = () => {
  const BCP_START = '2018-01-01';
  const limitedSets = useSnapshot(limitedFullStore).sets;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
        Sets:
      </div>
      <div className="flex max-sm:flex-col gap-2">
        <div className="flex basis-full flex-col gap-2 sm:basis-1/2">
          {Object.keys(setsAndPrecons)
           .filter((i) => i !== PLAYTEST && setsAndPrecons[i].date > BCP_START)
           .map((i) => {
             return (
               <AccountLimitedSet
                 key={i}
                 isChecked={limitedSets[i]}
                 handleSetChange={limitedSetChange}
                 setid={i}
               />
             );
           })}
        </div>
        <div className="flex basis-full flex-col gap-2 sm:basis-1/2">
          {Object.keys(setsAndPrecons)
           .filter((i) => i !== PLAYTEST && setsAndPrecons[i].date < BCP_START)
           .map((i) => {
             return (
               <AccountLimitedSet
                 key={i}
                 isChecked={limitedSets[i]}
                 handleSetChange={limitedSetChange}
                 setid={i}
               />
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default AccountLimitedSetSelection;
