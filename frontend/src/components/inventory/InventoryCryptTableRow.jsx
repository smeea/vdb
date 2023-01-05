import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import {
  CardPopover,
  UsedPopover,
  InventoryCardQuantity,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ConditionalTooltip,
  Tooltip,
} from 'components';
import { getHardTotal, getSoftMax } from 'utils';
import { useApp, usedStore, inventoryCardChange } from 'context';

const InventoryCryptTableRow = ({
  card,
  placement,
  compact,
  newFocus,
  inShared,
  handleClick,
}) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const { isMobile, isNarrow, isWide } = useApp();

  const [isSwiped, setIsSwiped] = useState();
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    onSwipedRight: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD)
        inventoryCardChange(card.c, card.q - 1);
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD) inventoryCardChange(card.c, card.q + 1);
    },
    onSwiped: () => {
      setIsSwiped(false);
    },
    onSwiping: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE) {
        if (e.deltaX < -SWIPE_THRESHOLD) {
          setIsSwiped('left');
        } else if (e.deltaX > SWIPE_THRESHOLD) {
          setIsSwiped('right');
        } else {
          setIsSwiped(false);
        }
      }
    },
  });

  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);

  const trBg = isSwiped
    ? isSwiped === 'left'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : '';

  return (
    <div
      className={`inventory-crypt-table flex w-full items-center border-none ${trBg}`}
      {...swipeHandlers}
    >
      {inShared ? (
        <div
          className={`flex min-w-[40px] items-center justify-center border-r border-bgSecondary bg-[#0000aa]/5 text-lg
        dark:border-bgSecondaryDark`}
        >
          {card.q || null}
        </div>
      ) : (
        <div className="flex min-w-[75px] items-center px-0.5">
          <InventoryCardQuantity
            cardid={card.c.Id}
            q={card.q}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        </div>
      )}
      {!inShared && (
        <div className="flex min-w-[40px] items-center justify-center">
          {isMobile ? (
            <div
              className={`flex w-full justify-center ${
                card.q == softUsedMax + hardUsedTotal
                  ? 'text-midGray dark:text-midGrayDark'
                  : card.q >= softUsedMax + hardUsedTotal
                  ? 'text-fgGreen dark:text-fgGreenDark'
                  : 'text-fgRed dark:text-fgRedDark'
              }`}
            >
              {card.q === softUsedMax + hardUsedTotal
                ? '='
                : card.q > softUsedMax + hardUsedTotal
                ? `+${card.q - softUsedMax - hardUsedTotal}`
                : card.q - softUsedMax - hardUsedTotal}
            </div>
          ) : (
            <Tooltip
              placement="bottom"
              overlay={<UsedPopover cardid={card.c.Id} />}
            >
              <div
                className={`flex w-full justify-center ${
                  card.q == softUsedMax + hardUsedTotal
                    ? 'text-midGray dark:text-midGrayDark'
                    : card.q >= softUsedMax + hardUsedTotal
                    ? 'text-fgGreen dark:text-fgGreenDark'
                    : 'text-fgRed dark:text-fgRedDark'
                }`}
              >
                {card.q === softUsedMax + hardUsedTotal
                  ? '='
                  : card.q > softUsedMax + hardUsedTotal
                  ? `+${card.q - softUsedMax - hardUsedTotal}`
                  : card.q - softUsedMax - hardUsedTotal}
              </div>
            </Tooltip>
          )}
        </div>
      )}
      <div
        className="flex min-w-[32px] items-center justify-center sm:min-w-[40px]"
        onClick={() => handleClick(card.c)}
      >
        <ResultCryptCapacity value={card.c.Capacity} />
      </div>
      {!isMobile && !isNarrow && (
        <div
          className="flex min-w-[170px] items-center lg:min-w-[180px]"
          onClick={() => handleClick(card.c)}
        >
          <ResultCryptDisciplines value={card.c.Disciplines} />
        </div>
      )}
      <div className="flex w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          placement={placement}
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
        >
          <ResultCryptName card={card.c} />
        </ConditionalTooltip>
      </div>
      {isWide ? (
        <>
          <div
            className="flex min-w-[25px] items-center justify-center"
            onClick={() => handleClick(card.c)}
          >
            {card.c.Title && <ResultCryptTitle value={card.c.Title} />}
          </div>
          <div
            className="flex min-w-[30px] items-center justify-center"
            onClick={() => handleClick(card.c)}
          >
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div
            className="flex min-w-[30px] items-center justify-center"
            onClick={() => handleClick(card.c)}
          >
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </>
      ) : (
        <div className="min-w-[45px]" onClick={() => handleClick(card.c)}>
          <div className="flex justify-center">
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div className="flex justify-end space-x-1 text-xs">
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
              {card.c.Title && <ResultCryptTitle value={card.c.Title} />}
            </div>
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCryptTableRow;
