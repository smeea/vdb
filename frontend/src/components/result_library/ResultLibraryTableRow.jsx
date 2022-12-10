import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import {
  CardPopover,
  UsedPopover,
  ButtonAddCard,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  ConditionalTooltip,
  Tooltip,
} from 'components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from 'utils/constants';
import { getHardTotal, getSoftMax } from 'utils';
import {
  useApp,
  deckStore,
  inventoryStore,
  usedStore,
  deckCardChange,
} from 'context';

const ResultLibraryTableRow = ({ card, handleClick, idx, placement }) => {
  const { addMode, inventoryMode, isMobile, isDesktop } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;
  const inDeck = deck?.library[card.Id]?.q || 0;
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;

  const [isSwiped, setIsSwiped] = useState();
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    onSwipedRight: (e) => {
      if (
        e.initial[0] > SWIPE_IGNORED_LEFT_EDGE &&
        e.absX > SWIPE_THRESHOLD &&
        isEditable &&
        addMode &&
        inDeck > 0
      ) {
        deckCardChange(deck.deckid, card, inDeck - 1);
      }
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD && isEditable && addMode) {
        deckCardChange(deck.deckid, card, inDeck + 1);
      }
    },
    onSwiped: () => {
      setIsSwiped(false);
    },
    onSwiping: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && addMode) {
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
  let inInventory = 0;
  if (inventoryMode) {
    if (inventoryLibrary[card.Id]) {
      inInventory = inventoryLibrary[card.Id].q;
    }
    softUsedMax = getSoftMax(usedLibrary.soft[card.Id]);
    hardUsedTotal = getHardTotal(usedLibrary.hard[card.Id]);
  }

  return (
    <tr
      {...swipeHandlers}
      className={`result-${idx % 2 ? 'even' : 'odd'} ${
        isSwiped ? `swiped-${isSwiped}` : ''
      }
`}
    >
      {isEditable && addMode && (
        <td className="quantity-add pr-1">
          <ButtonAddCard deckid={deck.deckid} card={card} inDeck={inDeck} />
        </td>
      )}
      {inventoryMode && (
        <td className="used">
          <Tooltip
            placement={isDesktop ? 'left' : 'bottom'}
            overlay={<UsedPopover cardid={card.Id} />}
          >
            {(inInventory > 0 || softUsedMax + hardUsedTotal > 0) && (
              <div
                className={`used ms-1 flex items-center justify-between px-1 ${
                  inInventory < softUsedMax + hardUsedTotal
                    ? 'inv-miss-full'
                    : ''
                }
                  `}
              >
                {inInventory}
                <div
                  className={`text-xs ${
                    inInventory >= softUsedMax + hardUsedTotal
                      ? 'gray'
                      : 'white'
                  } pl-1`}
                >
                  {inInventory >= softUsedMax + hardUsedTotal
                    ? `+${inInventory - softUsedMax - hardUsedTotal}`
                    : inInventory - softUsedMax - hardUsedTotal}
                </div>
              </div>
            )}
          </Tooltip>
        </td>
      )}
      <td
        className={card[BLOOD_COST] ? 'cost blood px-1' : 'cost px-1'}
        onClick={() => handleClick(idx)}
      >
        <ResultLibraryCost
          valueBlood={card[BLOOD_COST]}
          valuePool={card[POOL_COST]}
        />
      </td>
      <td className="type px-1" onClick={() => handleClick(idx)}>
        <ResultLibraryTypeImage value={card.Type} />
      </td>
      <td
        className="disciplines flex items-center justify-center px-1"
        onClick={() => handleClick(idx)}
      >
        <ResultLibraryClan value={card.Clan} />
        {card.Discipline && card.Clan && '+'}
        <ResultLibraryDisciplines value={card.Discipline} />
      </td>
      <td className="name px-1" onClick={() => handleClick(idx)}>
        <ConditionalTooltip
          placement={placement}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <ResultLibraryName card={card} />
        </ConditionalTooltip>
      </td>
      <td className="burn px-1" onClick={() => handleClick(idx)}>
        <ResultLibraryBurn value={card[BURN_OPTION]} />
        <ResultLibraryTrifle card={card} />
      </td>
    </tr>
  );
};

export default ResultLibraryTableRow;
