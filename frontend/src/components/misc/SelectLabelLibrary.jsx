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
import { TYPE, REQUIREMENT, CLAN, DISCIPLINE, LIBRARY } from '@/constants';

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
              {inventoryLibrary[cardid]?.q}
            </div>
          )}
          <ResultLibraryTypeImage value={card[TYPE]} />
          <ResultName card={card} isColored={false} />
        </div>
        <div className="flex items-center gap-2">
          <ResultLibraryRequirements value={card[REQUIREMENT]} />
          <div className="flex items-center gap-1.5">
            <ResultLibraryDisciplines value={card[DISCIPLINE]} />
            <ResultLibraryClan value={card[CLAN]} />
          </div>
          <ResultLibraryCost card={card} />
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
