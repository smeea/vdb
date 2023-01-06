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
  const card = libraryCardBase[cardid];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {inInventory && (
            <div
              className={` inline w-7 text-center text-lg ${
                inventoryLibrary[cardid]
                  ? 'rounded-md border-2 border-midGray dark:border-midGrayDark'
                  : ''
              }`}
            >
              {inventoryLibrary[cardid] && inventoryLibrary[cardid].q}
            </div>
          )}
          <ResultLibraryTypeImage value={card.Type} />
          <ResultLibraryName card={card} />
        </div>
        <div className="flex items-center space-x-2">
          <div>
            {card.Discipline && (
              <ResultLibraryDisciplines value={card.Discipline} />
            )}
            {card.Discipline && card.Clan && '+'}
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
          </div>
          {(card['Blood Cost'] || card['Pool Cost']) && (
            <ResultLibraryCost
              valuePool={card['Pool Cost']}
              valueBlood={card['Blood Cost']}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
