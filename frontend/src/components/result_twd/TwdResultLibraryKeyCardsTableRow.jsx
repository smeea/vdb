import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultName,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
  ResultLibraryClan,
  ConditionalTooltip,
} from '@/components';
import { useApp, limitedStore, inventoryStore, usedStore } from '@/context';
import { getHardTotal } from '@/utils';
import { ID, TYPE, CLAN, DISCIPLINE, REQUIREMENT, HARD, LIBRARY } from '@/constants';

const TwdResultLibraryKeyCardsTableRow = ({ card, handleClick, shouldShowModal }) => {
  const { limitedMode, inventoryMode, isMobile } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inLimited = limitedLibrary[card.c[ID]];
  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);

  return (
    <tr key={card.c[ID]} className="row-bg border-y border-bgSecondary dark:border-bgSecondaryDark">
      <td className="min-w-[28px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[35px]">
        {inventoryMode ? (
          <ConditionalTooltip overlay={<UsedPopover cardid={card.c[ID]} />} disabled={isMobile}>
            <div
              className={twMerge(
                'flex justify-center text-lg',
                inInventory < card.q
                  ? 'bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark'
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
      <td className="min-w-[55px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultLibraryTypeImage value={card.c[TYPE]} />
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
      {!isMobile && (
        <td className="min-w-[90px]" onClick={() => handleClick(card.c)}>
          <div className="flex items-center justify-center gap-1">
            {card.c[CLAN] && <ResultLibraryClan value={card.c[CLAN]} />}
            {card.c[DISCIPLINE] && <ResultLibraryDisciplines value={card.c[DISCIPLINE]} />}
            {card.c[REQUIREMENT] && <ResultLibraryRequirements value={card.c[REQUIREMENT]} />}
          </div>
        </td>
      )}
    </tr>
  );
};

export default TwdResultLibraryKeyCardsTableRow;
