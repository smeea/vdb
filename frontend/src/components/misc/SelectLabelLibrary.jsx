import React from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultLibraryName,
  ResultLibraryDisciplines,
  ResultLibraryTypeImage,
  ResultLibraryCost,
  ResultLibraryClan,
} from 'components';
import { useApp, inventoryStore } from 'context';

const SelectLabelLibrary = ({ cardid, inInventory }) => {
  const { libraryCardBase } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {inInventory && (
            <div
              className={` inline w-7 text-center text-lg ${
                inventoryLibrary[cardid]
                  ? 'rounded-md border-2 border-gray-500'
                  : ''
              }`}
            >
              {inventoryLibrary[cardid] && inventoryLibrary[cardid].q}
            </div>
          )}
          <ResultLibraryTypeImage value={libraryCardBase[cardid].Type} />
          <div>
            <ResultLibraryName card={libraryCardBase[cardid]} />
          </div>
        </div>
        <div>
          <div className="inline ">
            <ResultLibraryDisciplines
              value={libraryCardBase[cardid].Discipline}
            />
            {libraryCardBase[cardid].Discipline &&
              libraryCardBase[cardid].Clan &&
              '+'}
            <ResultLibraryClan value={libraryCardBase[cardid].Clan} />
          </div>
          {(libraryCardBase[cardid]['Blood Cost'] ||
            libraryCardBase[cardid]['Pool Cost']) && (
            <div className="inline ">
              <ResultLibraryCost
                valuePool={libraryCardBase[cardid]['Pool Cost']}
                valueBlood={libraryCardBase[cardid]['Blood Cost']}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
