import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  InventoryCardQuantity,
  InventoryCardQuantityDiff,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultCryptClanGroupTitle,
  ConditionalTooltip,
} from '@/components';
import { getHardTotal, getSoftMax } from '@/utils';
import { useApp, inventoryStore, usedStore, limitedStore, inventoryCardChange } from '@/context';
import { useSwipe } from '@/hooks';

const InventoryCryptTableRow = ({ card, compact, newFocus, inShared, handleClick }) => {
  const { isMobile, isNarrow, isWide, limitedMode } = useApp();
  const usedCrypt = useSnapshot(usedStore).crypt;
  const limitedCrypt = useSnapshot(limitedStore).crypt;
  const inLimited = limitedCrypt[card.c.Id];
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);
  const isEditable = !useSnapshot(inventoryStore).isFrozen;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => inventoryCardChange(card.c, card.q - 1),
    () => inventoryCardChange(card.c, card.q + 1),
  );

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : '';

  return (
    <div className={`flex w-full items-center ${trBg}`} {...swipeHandlers}>
      {inShared ? (
        <div className="flex h-full min-w-[42px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[48px]">
          {card.q || null}
        </div>
      ) : (
        <div
          className={`flex ${isEditable ? 'min-w-[84px]' : 'h-full min-w-[42px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[48px]'}`}
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
      <div
        className="flex min-w-[32px] justify-center sm:min-w-[40px]"
        onClick={() => handleClick(card.c)}
      >
        <ResultCryptCapacity card={card.c} />
      </div>
      {!isMobile && !isNarrow && (
        <div className="flex min-w-[170px] lg:min-w-[180px]" onClick={() => handleClick(card.c)}>
          <ResultCryptDisciplines value={card.c.Disciplines} />
        </div>
      )}
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
      {isWide ? (
        <>
          <div className="flex min-w-[25px] justify-center" onClick={() => handleClick(card.c)}>
            {card.c.Title && <ResultCryptTitle value={card.c.Title} />}
          </div>
          <div className="flex min-w-[35px] justify-center" onClick={() => handleClick(card.c)}>
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div className="flex min-w-[30px] justify-center" onClick={() => handleClick(card.c)}>
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </>
      ) : (
        <div className="min-w-[40px]" onClick={() => handleClick(card.c)}>
          <ResultCryptClanGroupTitle card={card.c} />
        </div>
      )}
    </div>
  );
};

export default InventoryCryptTableRow;
