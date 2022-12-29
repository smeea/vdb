import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import {
  CardPopover,
  UsedPopover,
  InventoryCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalTooltip,
  Tooltip,
} from 'components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from 'utils/constants';
import { isTrifle, getHardTotal, getSoftMax } from 'utils';
import { useApp, usedStore, inventoryCardChange } from 'context';

const InventoryLibraryTableRow = ({
  card,
  placement,
  compact,
  newFocus,
  inShared,
  handleClick,
}) => {
  const usedLibrary = useSnapshot(usedStore).library;
  const { isMobile, isNarrow } = useApp();

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
  if (usedLibrary) {
    softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
    hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
  }

  const trBg = isSwiped
    ? isSwiped === 'left' ? 'bg-bgSuccess dark:bg-bgSuccessDark' : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : ''

  return (
    <div
    className={`inventory-library-table flex border-none ${trBg}`}
      {...swipeHandlers}
    >
      <div
        className={`flex items-center justify-center ${
          inShared ? 'quantity-no-buttons ' : 'quantity]'
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
        <div className="used flex items-center justify-center">
          {isMobile ? (
            <div
              className={`flex w-full justify-center ${
                card.q == softUsedMax + hardUsedTotal
                  ? 'gray'
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
                    ? 'gray'
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
        className="type flex items-center justify-center"
        onClick={() => handleClick(card.c)}
      >
        <ResultLibraryTypeImage value={card.c.Type} />
      </div>

      <ConditionalTooltip
        placement={placement}
        overlay={<CardPopover card={card.c} />}
        disabled={isMobile}
      >
        <div
          className="name flex items-center justify-start"
          onClick={() => handleClick(card.c)}
        >
          <ResultLibraryName card={card.c} />
        </div>
      </ConditionalTooltip>

      {isMobile ? (
        <div
          className="disciplines flex items-center justify-between"
          onClick={() => handleClick(card.c)}
        >
          <div
            className={`flex items-center justify-center ${
              card.c[BLOOD_COST] && 'blood'
            }`}
            onClick={() => handleClick(card.c)}
          >
            {(card.c[BLOOD_COST] || card.c[POOL_COST]) && (
              <ResultLibraryCost
                valueBlood={card.c[BLOOD_COST]}
                valuePool={card.c[POOL_COST]}
              />
            )}
          </div>
          <div
            className="flex items-center justify-center"
            onClick={() => handleClick(card.c)}
          >
            {card.c.Clan && <ResultLibraryClan value={card.c.Clan} />}
            {card.c.Discipline && card.c.Clan && '+'}
            {card.c.Discipline && (
              <ResultLibraryDisciplines value={card.c.Discipline} />
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`flex items-center justify-center ${
              card.c[BLOOD_COST] && 'blood'
            } cost`}
            onClick={() => handleClick(card.c)}
          >
            {(card.c[BLOOD_COST] || card.c[POOL_COST]) && (
              <ResultLibraryCost
                valueBlood={card.c[BLOOD_COST]}
                valuePool={card.c[POOL_COST]}
              />
            )}
          </div>
          <div
            className="disciplines flex items-center justify-center"
            onClick={() => handleClick(card.c)}
          >
            {card.c.Clan && <ResultLibraryClan value={card.c.Clan} />}
            {card.c.Discipline && card.c.Clan && '+'}
            {card.c.Discipline && (
              <ResultLibraryDisciplines value={card.c.Discipline} />
            )}
          </div>
        </>
      )}
      {!isNarrow && (
        <div
          className="burn flex items-center justify-center"
          onClick={() => handleClick(card.c)}
        >
          {card.c[BURN_OPTION] && <ResultLibraryBurn />}
          {isTrifle(card.c) && <ResultLibraryTrifle />}
        </div>
      )}
    </div>
  );
};

export default InventoryLibraryTableRow;
