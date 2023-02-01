import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultCryptName,
  ResultCryptCapacity,
  ResultClanImage,
  ConditionalTooltip,
} from '@/components';
import { getHardTotal } from '@/utils';
import { useApp, inventoryStore, usedStore } from '@/context';

const TwdResultCryptTableRow = ({ card, idx, handleClick }) => {
  const { inventoryMode, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);

  return (
    <tr
      key={card.c.Id}
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      <td className="min-w-[28px] border-r border-bgSecondary bg-[#0000aa]/5 dark:border-bgSecondaryDark sm:min-w-[35px]">
        {inventoryMode ? (
          <ConditionalTooltip
            overlay={<UsedPopover cardid={card.c.Id} />}
            disabled={isMobile}
          >
            <div
              className={`flex justify-center text-lg ${
                inInventory < card.q
                  ? 'bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark'
                  : inInventory - hardUsedTotal < card.q
                  ? 'bg-bgWarning dark:bg-bgWarningDark'
                  : ''
              }`}
            >
              {card.q}
            </div>
          </ConditionalTooltip>
        ) : (
          <div className="flex justify-center text-lg">{card.q}</div>
        )}
      </td>
      <td
        className="min-w-[30px] sm:min-w-[40px]"
        onClick={() => handleClick(card.c)}
      >
        <div className="flex justify-center">
          <ResultCryptCapacity value={card.c.Capacity} />
        </div>
      </td>

      <td className="w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
          noPadding
        >
          <div className="flex">
            <ResultCryptName card={card.c} />
          </div>
        </ConditionalTooltip>
      </td>
      <td className="min-w-[30px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultClanImage value={card.c.Clan} />
        </div>
      </td>
    </tr>
  );
};

export default TwdResultCryptTableRow;
