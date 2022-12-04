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

  let softUsedMax = 0;
  let hardUsedTotal = 0;

  if (usedCrypt) {
    softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]);
    hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);
  }

  return (
    <div
      className={`flex no-border inventory-crypt-table ${
        isSwiped ? `swiped-${isSwiped}` : ''
      }`}
      {...swipeHandlers}
    >
      <div
        className={`flex items-center justify-center ${
          inShared ? 'quantity-no-buttons me-2' : 'quantity px-1]'
        }`}
      >
        {inShared ? (
          <>{card.q || null}</>
        ) : (
          <InventoryCardQuantity
            cardid={card.c.Id}
            q={card.q}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        )}
      </div>
      {!inShared && (
        <div className="flex items-center justify-center used">
          {isMobile ? (
            <div
              className={`flex justify-center w-100 ps-1 ${
                card.q == softUsedMax + hardUsedTotal
                  ? 'gray'
                  : card.q >= softUsedMax + hardUsedTotal
                  ? 'green'
                  : 'red'
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
                className={`flex justify-center w-100 ps-1 ${
                  card.q == softUsedMax + hardUsedTotal
                    ? 'gray'
                    : card.q >= softUsedMax + hardUsedTotal
                    ? 'green'
                    : 'red'
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
        className="flex items-center justify-center capacity"
        onClick={() => handleClick(card.c)}
      >
        <ResultCryptCapacity value={card.c.Capacity} />
      </div>
      {!isMobile && !isNarrow && (
        <div
          className="flex items-center content-left disciplines"
          onClick={() => handleClick(card.c)}
        >
          <ResultCryptDisciplines value={card.c.Disciplines} />
        </div>
      )}
      <ConditionalTooltip
        placement={placement}
        overlay={<CardPopover card={card.c} />}
        disabled={isMobile}
      >
        <div
          className="flex items-center justify-start name"
          onClick={() => handleClick(card.c)}
        >
          <ResultCryptName card={card.c} />
        </div>
      </ConditionalTooltip>
      {isWide ? (
        <>
          <div
            className="flex items-center justify-center title"
            onClick={() => handleClick(card.c)}
          >
            <ResultCryptTitle value={card.c.Title} />
          </div>
          <div
            className="flex items-center justify-center clan"
            onClick={() => handleClick(card.c)}
          >
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div
            className="flex items-center justify-center group pe-1"
            onClick={() => handleClick(card.c)}
          >
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </>
      ) : (
        <div className="clan-group" onClick={() => handleClick(card.c)}>
          <div className="flex justify-center">
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div className="flex text-xs justify-end">
            <div className="font-bold text-blue">
              <ResultCryptTitle value={card.c.Title} />
            </div>
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCryptTableRow;
