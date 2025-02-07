import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptSect,
  ResultName,
  ResultPathImage,
} from '@/components';
import { ANY, CLAN, CRYPT, DISCIPLINES, GROUP, PATH, SECT, X } from '@/constants';
import { inventoryStore, useApp } from '@/context';

const SelectLabelCrypt = ({ cardid, inInventory }) => {
  const { cryptCardBase } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const card = cryptCardBase[cardid];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {inInventory && (
            <div
              className={twMerge(
                'inline w-7 text-center text-lg',
                inventoryCrypt[cardid] &&
                  'border-midGray dark:border-midGrayDark rounded-md border-2',
              )}
            >
              {inventoryCrypt[cardid]?.q}
            </div>
          )}
          <div className="min-w-[24px]">
            <ResultCryptCapacity card={card} />
          </div>
          <ResultName card={card} isColored={false} />
          <div className="text-midGray dark:text-midGrayDark inline">
            [G
            <div className="text-fgPrimary dark:text-fgPrimaryDark inline">
              {card[GROUP] == ANY ? X : card[GROUP]}
            </div>
            ]
          </div>
          <ResultClanImage value={card[CLAN]} />
          <div className="flex justify-center">
            {card[PATH] ? (
              <ResultPathImage value={card[PATH]} />
            ) : (
              <ResultCryptSect value={card[SECT]} />
            )}
          </div>
        </div>
        <div className="flex whitespace-nowrap">
          <ResultCryptDisciplines value={card[DISCIPLINES]} />
        </div>
      </div>
    </>
  );
};

export default SelectLabelCrypt;
