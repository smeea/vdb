import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  ConditionalTooltip,
  InventoryCardQuantity,
  InventoryCardQuantityDiff,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryTypeImage,
  ResultMiscImage,
  ResultName,
} from '@/components';
import {
  BLOOD,
  BURN,
  CLAN,
  CONVICTION,
  DISCIPLINE,
  HARD,
  ID,
  IS_FROZEN,
  LIBRARY,
  POOL,
  SOFT,
  TRIFLE,
  TYPE,
} from '@/constants';
import { inventoryCardChange, inventoryStore, useApp, usedStore } from '@/context';
import { useSwipe } from '@/hooks';
import { getHardTotal, getSoftMax, getSwipedBg } from '@/utils';

const InventoryLibraryTableRow = ({ card, compact, newFocus, inShared, handleClick }) => {
  const { isMobile, isNarrow } = useApp();
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const softUsedMax = getSoftMax(usedLibrary[SOFT][card.c[ID]]);
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN] && !inShared;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => inventoryCardChange(card.c, card.q - 1),
    () => inventoryCardChange(card.c, card.q + 1),
  );

  const onClick = useCallback(() => {
    handleClick(card.c);
  }, [card]);

  return (
    <div
      {...swipeHandlers}
      className={twMerge('flex w-full items-center', getSwipedBg(isSwiped, true))}
    >
      <div
        className={twMerge(
          'flex items-center justify-center',
          isEditable
            ? 'min-w-[84px]'
            : 'border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark h-full min-w-[42px] border-r sm:min-w-[48px]',
        )}
      >
        {inShared ? (
          <>{card.q || null}</>
        ) : (
          <InventoryCardQuantity
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        )}
      </div>
      {!inShared && (
        <div className="flex min-w-[40px] justify-center">
          <InventoryCardQuantityDiff
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
          />
        </div>
      )}
      <div className="flex min-w-[40px] justify-center" onClick={onClick}>
        <ResultLibraryTypeImage value={card.c[TYPE]} />
      </div>
      <div className="flex w-full" onClick={onClick}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
          className="flex w-full"
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} />
          </div>
        </ConditionalTooltip>
      </div>
      {isMobile ? (
        <div className="flex min-w-[82px] justify-between" onClick={onClick}>
          {!!(card.c[BLOOD] || card.c[POOL] || card.c[CONVICTION]) && (
            <div
              className={twMerge('flex min-w-[22px] justify-center', card.c[BLOOD] && 'pb-1')}
              onClick={onClick}
            >
              <ResultLibraryCost card={card.c} />
            </div>
          )}
          <div className="flex w-full items-center justify-end" onClick={onClick}>
            <ResultLibraryClan value={card.c[CLAN]} />
            {card.c[DISCIPLINE] && card.c[CLAN] && '+'}
            <ResultLibraryDisciplines value={card.c[DISCIPLINE]} />
          </div>
        </div>
      ) : (
        <>
          <div
            className={twMerge('flex min-w-[30px] justify-center', card.c[BLOOD] && 'pb-1')}
            onClick={onClick}
          >
            <ResultLibraryCost card={card.c} />
          </div>
          <div className="flex min-w-[82px] justify-center" onClick={onClick}>
            <ResultLibraryClan value={card.c[CLAN]} />
            {card.c[DISCIPLINE] && card.c[CLAN] && '+'}
            <ResultLibraryDisciplines value={card.c[DISCIPLINE]} />
          </div>
        </>
      )}
      <div className="flex max-lg:hidden min-w-[30px] justify-center" onClick={onClick}>
        {card.c[BURN] && <ResultMiscImage value={BURN} />}
        {card.c[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
      </div>
    </div>
  );
};

export default InventoryLibraryTableRow;
