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
        <div className="flex items-center">
          {inInventory && (
            <div
              className={` inline w-7 text-center text-lg ${
                inventoryLibrary[cardid]
                  ? 'border-gray-500 rounded-md border-2'
                  : ''
              }`}
            >
              {inventoryLibrary[cardid] && inventoryLibrary[cardid].q}
            </div>
          )}
          <ResultLibraryTypeImage value={card.Type} />
          <div>
            <ResultLibraryName card={card} />
          </div>
        </div>
        <div>
          <div className="inline ">
            {card.Discipline && (
              <ResultLibraryDisciplines value={card.Discipline} />
            )}
            {card.Discipline && card.Clan && '+'}
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
          </div>
          {(card['Blood Cost'] || card['Pool Cost']) && (
            <div className="inline ">
              <ResultLibraryCost
                valuePool={card['Pool Cost']}
                valueBlood={card['Blood Cost']}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
