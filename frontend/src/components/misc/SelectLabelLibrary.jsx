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
import { LIBRARY, BLOOD_COST, POOL_COST } from '@/constants';

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
          <ResultLibraryTypeImage value={card.Type} />
          <ResultName card={card} colored={false} />
        </div>
        <div className="flex items-center gap-2">
          {card.Requirement && <ResultLibraryRequirements value={card.Requirement} />}
          <div className="flex items-center gap-1.5">
            {card.Discipline && <ResultLibraryDisciplines value={card.Discipline} />}
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
          </div>
          {(card[BLOOD_COST] || card[POOL_COST]) && (
            <ResultLibraryCost valuePool={card[POOL_COST]} valueBlood={card[BLOOD_COST]} />
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
