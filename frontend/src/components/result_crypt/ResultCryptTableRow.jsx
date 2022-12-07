import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import {
  CardPopover,
  UsedPopover,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ButtonAddCard,
  ConditionalTooltip,
  Tooltip,
} from 'components';
import { getSoftMax, getHardTotal } from 'utils';
import {
  useApp,
  deckStore,
  inventoryStore,
  usedStore,
  deckCardChange,
} from 'context';

const ResultCryptTableRow = ({
  card,
  handleClick,
  idx,
  inRecommendation,
  placement,
  maxDisciplines,
}) => {
  const { addMode, inventoryMode, isMobile, isDesktop, isWide } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inDeck = deck?.crypt[card.Id]?.q || 0;
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
    if (inventoryCrypt[card.Id]) {
      inInventory = inventoryCrypt[card.Id].q;
    }
    softUsedMax = getSoftMax(usedCrypt.soft[card.Id]);
    hardUsedTotal = getHardTotal(usedCrypt.hard[card.Id]);
  }

  return (
    <tr
      {...swipeHandlers}
      className={`result-${idx % 2 ? 'even' : 'odd'} ${
        isSwiped ? `swiped-${isSwiped}` : ''
      }
`}
    >
      {(inRecommendation ? isEditable : isEditable && addMode) && (
        <td className="quantity-add pe-1">
          <ButtonAddCard
            cardid={card.Id}
            deckid={deck.deckid}
            card={card}
            inDeck={inDeck}
          />
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
                  } ps-1`}
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
        className={isMobile ? 'capacity px-1' : 'capacity px-2'}
        onClick={() => handleClick(card)}
      >
        <ResultCryptCapacity value={card.Capacity} />
      </td>
      <td className="disciplines" onClick={() => handleClick(card)}>
        <ResultCryptDisciplines
          maxDisciplines={maxDisciplines}
          value={card.Disciplines}
        />
      </td>
      <td className="name px-2" onClick={() => handleClick(card)}>
        <ConditionalTooltip
          placement={placement}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <ResultCryptName card={card} />
        </ConditionalTooltip>
      </td>
      {isWide ? (
        <>
          <td className="title pe-2" onClick={() => handleClick(card)}>
            <ResultCryptTitle value={card.Title} />
          </td>
          <td className="clan" onClick={() => handleClick(card)}>
            <ResultClanImage value={card.Clan} />
          </td>
          <td className="group" onClick={() => handleClick(card)}>
            <ResultCryptGroup value={card.Group} />
          </td>
        </>
      ) : (
        <>
          <td className="clan-group" onClick={() => handleClick(card)}>
            <div>
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="flex justify-end text-xs">
              <div className="text-blue font-bold">
                <ResultCryptTitle value={card.Title} />
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default ResultCryptTableRow;
