import React from 'react';
// import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
// import { useSwipeable } from 'react-swipeable';
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
import {
  useApp,
  usedStore,
  limitedStore,
  // inventoryCardChange,
} from '@/context';
// import { useDebounce } from '@/hooks';

const InventoryCryptTableRow = ({ card, compact, newFocus, inShared, handleClick }) => {
  const { isMobile, isNarrow, isWide, limitedMode } = useApp();
  const usedCrypt = useSnapshot(usedStore).crypt;
  const limitedCrypt = useSnapshot(limitedStore).crypt;
  const inLimited = limitedCrypt[card.c.Id];
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);

  // TODO fix bg-color changes on swipes (not working probably because of virtualized as same code work in Decks)
  // removed as without bg-color it is very easy to mistakenly swipe and not even notice
  //
  // const [isSwiped, setIsSwiped] = useState();
  // useDebounce(() => setIsSwiped(false), 500, [isSwiped]);
  // const SWIPE_THRESHOLD = 50;
  // const SWIPE_IGNORED_LEFT_EDGE = 30;
  // const swipeHandlers = useSwipeable({
  //   swipeDuration: 250,
  //   onSwipedLeft: (e) => {
  //     if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD) {
  //       setIsSwiped('left');
  //       inventoryCardChange(card.c, card.q - 1);
  //     }
  //   },
  //   onSwipedRight: (e) => {
  //     if (e.absX > SWIPE_THRESHOLD) {
  //       setIsSwiped('right');
  //       inventoryCardChange(card.c, card.q + 1);
  //     }
  //   },
  // });

  // const trBg = isSwiped
  //       ? isSwiped === 'right'
  //       ? 'bg-bgSuccess dark:bg-bgSuccessDark'
  //       : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
  //       : '';

  return (
    // <div className={`flex w-full items-center ${trBg}`} {...swipeHandlers}>
    <div className="flex w-full items-center">
      {inShared ? (
        <div
          className={`flex h-full min-w-[40px] items-center justify-center border-r border-bgSecondary bg-blue/5 text-lg dark:border-bgSecondaryDark`}
        >
          {card.q || null}
        </div>
      ) : (
        <div className="flex min-w-[80px] px-0.5">
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
