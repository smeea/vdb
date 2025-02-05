import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultName,
  ResultCryptCapacity,
  ResultClanImage,
  ConditionalTooltip,
  Tr,
} from '@/components';
import { getHardTotal } from '@/utils';
import { useApp, limitedStore, inventoryStore, usedStore } from '@/context';
import { ID, CLAN, HARD, CRYPT } from '@/constants';

const TwdResultCryptTableRow = ({ card, handleClick, shouldShowModal }) => {
  const { limitedMode, inventoryMode, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const limitedCrypt = useSnapshot(limitedStore)[CRYPT];
  const inLimited = limitedCrypt[card.c[ID]];
  const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]);

  return (
    <Tr key={card.c[ID]}>
      <td className="border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark min-w-[28px] border-r sm:min-w-[35px]">
        {inventoryMode ? (
          <ConditionalTooltip overlay={<UsedPopover cardid={card.c[ID]} />} disabled={isMobile}>
            <div
              className={twMerge(
                'flex justify-center text-lg',
                inInventory < card.q
                  ? 'bg-bgError dark:bg-bgErrorDark dark:text-whiteDark text-white'
                  : inInventory - hardUsedTotal < card.q && 'bg-bgWarning dark:bg-bgWarningDark',
              )}
            >
              {card.q}
            </div>
          </ConditionalTooltip>
        ) : (
          <div className="flex justify-center text-lg">{card.q}</div>
        )}
      </td>
      <td className="min-w-[30px] sm:min-w-[40px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultCryptCapacity card={card.c} />
        </div>
      </td>

      <td className="w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile || shouldShowModal}
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} isBanned={limitedMode && !inLimited} />
          </div>
        </ConditionalTooltip>
      </td>
      <td className="min-w-[30px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultClanImage value={card.c[CLAN]} />
        </div>
      </td>
    </Tr>
  );
};

export default TwdResultCryptTableRow;
