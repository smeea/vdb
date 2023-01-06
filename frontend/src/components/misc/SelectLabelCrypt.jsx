import React from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultCryptName,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultClanImage,
} from 'components';
import { useApp, inventoryStore } from 'context';

const SelectLabelCrypt = ({ cardid, inInventory }) => {
  const { cryptCardBase } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const card = cryptCardBase[cardid];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {inInventory && (
            <div
              className={` inline w-7 text-center text-lg ${
                inventoryCrypt[cardid]
                  ? 'rounded-md border-2 border-midGray dark:border-midGrayDark'
                  : ''
              }`}
            >
              {inventoryCrypt[cardid] && inventoryCrypt[cardid].q}
            </div>
          )}
          <ResultCryptCapacity value={card.Capacity} />
          <ResultCryptName card={card} />
          <div className="text-midGray dark:text-midGrayDark">
            [G{card.Group}]
          </div>
          <ResultClanImage value={card.Clan} />
        </div>
        <div className="flex whitespace-nowrap">
          <ResultCryptDisciplines value={card.Disciplines} />
        </div>
      </div>
    </>
  );
};

export default SelectLabelCrypt;
