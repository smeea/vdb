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
        <div className="flex items-center">
          {inInventory && (
            <div
              className={` inline w-7 text-center text-lg ${
                inventoryCrypt[cardid]
                  ? 'border-midGray dark:border-midGrayDark rounded-md border-2'
                  : ''
              }`}
            >
              {inventoryCrypt[cardid] && inventoryCrypt[cardid].q}
            </div>
          )}
          <ResultCryptCapacity value={card.Capacity} />
          <div>
            <ResultCryptName card={card} />
            {card['New'] && (
              <div className="text-midGray dark:text-midGrayDark  inline">[G{card.Group}]</div>
            )}
          </div>
          <div>
            <ResultClanImage value={card.Clan} />
          </div>
        </div>
        <div className="flex whitespace-nowrap">
          <ResultCryptDisciplines value={card.Disciplines} />
        </div>
      </div>
    </>
  );
};

export default SelectLabelCrypt;
