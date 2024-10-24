import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ResultName,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultClanImage,
} from '@/components';
import { useApp, inventoryStore } from '@/context';
import { CRYPT } from '@/utils/constants';

const SelectLabelCrypt = ({ cardid, inInventory }) => {
  const { cryptCardBase } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const card = cryptCardBase[cardid];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {inInventory && (
            <div
              className={twMerge(
                'inline w-7 text-center text-lg',
                inventoryCrypt[cardid] &&
                  'rounded-md border-2 border-midGray dark:border-midGrayDark',
              )}
            >
              {inventoryCrypt[cardid] && inventoryCrypt[cardid].q}
            </div>
          )}
          <ResultCryptCapacity card={card} />
          <ResultName card={card} colored={false} />
          <div className="text-midGray dark:text-midGrayDark">[G{card.Group}]</div>
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
