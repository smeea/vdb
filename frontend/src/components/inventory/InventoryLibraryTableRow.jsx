import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  InventoryCardQuantity,
  InventoryCardQuantityDiff,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultMiscImage,
  ResultName,
  ConditionalTooltip,
} from '@/components';
import { getSwipedBg, getHardTotal, getSoftMax } from '@/utils';
import { useApp, inventoryStore, usedStore, limitedStore, inventoryCardChange } from '@/context';
import { useSwipe } from '@/hooks';
import { IS_FROZEN, SOFT, HARD, LIBRARY, TRIFLE, POOL, BLOOD, BURN } from '@/constants';

const InventoryLibraryTableRow = ({ card, compact, newFocus, inShared, handleClick }) => {
  const { isMobile, isNarrow, limitedMode } = useApp();
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];
  const inLimited = limitedLibrary[card.c[ID]];
  const softUsedMax = getSoftMax(usedLibrary[SOFT][card.c[ID]]);
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN];

  const { isSwiped, swipeHandlers } = useSwipe(
    () => inventoryCardChange(card.c, card.q - 1),
    () => inventoryCardChange(card.c, card.q + 1),
  );

  return (
    <div
      {...swipeHandlers}
      className={twMerge('flex w-full items-center', getSwipedBg(isSwiped, true))}
    >
      {inShared ? (
        <div className="flex h-full min-w-[42px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[48px]">
          {card.q || null}
        </div>
      ) : (
        <div
          className={twMerge(
            'flex',
            isEditable
              ? 'min-w-[84px]'
              : 'h-full min-w-[42px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[48px]',
          )}
        >
          <InventoryCardQuantity
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        </div>
      )}
      {!inShared && (
        <div className="flex min-w-[40px] justify-center">
          <InventoryCardQuantityDiff
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
          />
        </div>
      )}
      <div className="flex min-w-[40px] justify-center" onClick={() => handleClick(card.c)}>
        <ResultLibraryTypeImage value={card.c[TYPE]} />
      </div>
      <div className="flex w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
          className="flex w-full"
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} isBanned={limitedMode && !inLimited} />
          </div>
        </ConditionalTooltip>
      </div>
      {isMobile ? (
        <div className="flex min-w-[82px] justify-between" onClick={() => handleClick(card.c)}>
          {(card.c[BLOOD] || card.c[POOL]) && (
            <div
              className={twMerge('flex min-w-[22px] justify-center', card.c[BLOOD] && 'pb-1')}
              onClick={() => handleClick(card.c)}
            >
              <ResultLibraryCost valueBlood={card.c[BLOOD]} valuePool={card.c[POOL]} />
            </div>
          )}
          <div className="flex w-full items-center justify-end" onClick={() => handleClick(card.c)}>
            {card.c[CLAN] && <ResultLibraryClan value={card.c[CLAN]} />}
            {card.c[DISCIPLINE] && card.c[CLAN] && '+'}
            {card.c[DISCIPLINE] && <ResultLibraryDisciplines value={card.c[DISCIPLINE]} />}
          </div>
        </div>
      ) : (
        <>
          <div
            className={twMerge('flex min-w-[30px] justify-center', card.c[BLOOD] && 'pb-1')}
            onClick={() => handleClick(card.c)}
          >
            {(card.c[BLOOD] || card.c[POOL]) && (
              <ResultLibraryCost valueBlood={card.c[BLOOD]} valuePool={card.c[POOL]} />
            )}
          </div>
          <div className="flex min-w-[82px] justify-center" onClick={() => handleClick(card.c)}>
            {card.c[CLAN] && <ResultLibraryClan value={card.c[CLAN]} />}
            {card.c[DISCIPLINE] && card.c[CLAN] && '+'}
            {card.c[DISCIPLINE] && <ResultLibraryDisciplines value={card.c[DISCIPLINE]} />}
          </div>
        </>
      )}
      {!isNarrow && (
        <div className="flex min-w-[30px] justify-center" onClick={() => handleClick(card.c)}>
          {card.c[BURN] && <ResultMiscImage value={BURN} />}
          {card.c[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
        </div>
      )}
    </div>
  );
};

export default InventoryLibraryTableRow;
