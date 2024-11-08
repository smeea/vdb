import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ResultName,
  ResultLibraryDisciplines,
  ResultLibraryTypeImage,
  ResultLibraryRequirements,
  ResultLibraryCost,
  ResultLibraryClan,
} from '@/components';
import { useApp, inventoryStore } from '@/context';
import { TYPE, REQUIREMENT, CLAN, DISCIPLINE, LIBRARY, BLOOD, POOL } from '@/constants';

const SelectLabelLibrary = ({ cardid, inInventory }) => {
  const { libraryCardBase } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const card = libraryCardBase[cardid];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {inInventory && (
            <div
              className={twMerge(
                'inline w-7 text-center text-lg',
                inventoryLibrary[cardid] &&
                  'rounded-md border-2 border-midGray dark:border-midGrayDark',
              )}
            >
              {inventoryLibrary[cardid] && inventoryLibrary[cardid].q}
            </div>
          )}
          <ResultLibraryTypeImage value={card[TYPE]} />
          <ResultName card={card} colored={false} />
        </div>
        <div className="flex items-center gap-2">
          {card[REQUIREMENT] && <ResultLibraryRequirements value={card[REQUIREMENT]} />}
          <div className="flex items-center gap-1.5">
            {card[DISCIPLINE] && <ResultLibraryDisciplines value={card[DISCIPLINE]} />}
            {card[CLAN] && <ResultLibraryClan value={card[CLAN]} />}
          </div>
          {(card[BLOOD] || card[POOL]) && (
            <ResultLibraryCost valuePool={card[POOL]} valueBlood={card[BLOOD]} />
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
