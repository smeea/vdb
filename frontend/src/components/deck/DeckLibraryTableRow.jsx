import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSnapshot } from 'valtio';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import {
  deckCardChange,
  deckUpdate,
  useApp,
  usedStore,
  inventoryStore,
  deckStore,
} from 'context';
import {
  Tooltip,
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryTableRowCommon,
  DeckDrawProbabilityText,
  ConditionalTooltip,
} from 'components';
import { getSoftMax, getHardTotal, drawProbability } from 'utils';

const DeckLibraryTableRow = ({
  idx,
  disableOverlay,
  placement,
  handleClick,
  card,
  deck,
  showInfo,
  libraryTotal,
  inSearch,
  inMissing,
  setModalDraw,
}) => {
  const { inventoryMode, isMobile } = useApp();

  const decks = useSnapshot(deckStore).decks;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const [isSwiped, setIsSwiped] = useState();
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    onSwipedRight: (e) => {
      if (
        e.initial[0] > SWIPE_IGNORED_LEFT_EDGE &&
        e.absX > SWIPE_THRESHOLD &&
        isEditable
      )
        deckCardChange(deckid, card.c, card.q - 1);
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD && isEditable)
        deckCardChange(deckid, card.c, card.q + 1);
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

  let inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  let softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  let hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

  const toggleInventoryState = (deckid, cardid) => {
    const value = card.i ? '' : deck.inventoryType === 's' ? 'h' : 's';
    deckUpdate(deckid, 'usedInInventory', {
      [cardid]: value,
    });
  };

  return (
    <tr
      {...swipeHandlers}
      className={`result-${idx % 2 ? 'even' : 'odd'} ${
        isSwiped ? `swiped-${isSwiped}` : ''
      }
`}
    >
      {isEditable ? (
        <>
          {inventoryMode && decks ? (
            <>
              {deck.inventoryType && !inSearch && !isMobile && (
                <td>
                  <div className="relative flex items-center">
                    <div
                      className={`inventory-card-custom absolute left-[-24px]
                        ${card.i ? '' : 'not-selected opacity-0'}
                      `}
                      onClick={() => toggleInventoryState(deckid, card.c.Id)}
                    >
                      {deck.inventoryType == 's' ? (
                        <PinAngleFill />
                      ) : (
                        <Shuffle />
                      )}
                    </div>
                  </div>
                </td>
              )}
              <td className="quantity">
                <ConditionalTooltip
                  placement="bottom"
                  overlay={<UsedPopover cardid={card.c.Id} />}
                  disabled={disableOverlay}
                >
                  <DeckCardQuantity
                    card={card.c}
                    q={card.q}
                    deckid={deckid}
                    cardChange={deckCardChange}
                    inInventory={inInventory}
                    softUsedMax={softUsedMax}
                    hardUsedTotal={hardUsedTotal}
                    inventoryType={decks[deckid]?.inventoryType}
                  />
                </ConditionalTooltip>
              </td>
            </>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                card={card.c}
                q={card.q}
                deckid={deckid}
                cardChange={deckCardChange}
              />
            </td>
          )}
        </>
      ) : (
        <>
          {inventoryMode && decks ? (
            <td className="quantity-no-buttons ">
              <ConditionalTooltip
                placement="bottom"
                overlay={<UsedPopover cardid={card.c.Id} />}
                disabled={disableOverlay}
              >
                <div
                  className={
                    inMissing
                      ? null
                      : inInventory < card.q
                      ? 'inv-miss-full'
                      : inInventory < hardUsedTotal + card.q
                      ? 'inv-miss-part'
                      : null
                  }
                >
                  {card.q || null}
                </div>
              </ConditionalTooltip>
            </td>
          ) : (
            <td className="quantity-no-buttons ">{card.q || null}</td>
          )}
        </>
      )}
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
        inSearch={inSearch}
        inDeck
      />
      {showInfo && (
        <td className="text-blue w-9  text-right">
          {isMobile ? (
            <div
              onClick={() =>
                setModalDraw({
                  name: card.c['Name'],
                  prob: (
                    <DeckDrawProbabilityText
                      N={libraryTotal}
                      n={7}
                      k={card.q}
                    />
                  ),
                })
              }
            >
              {`${Math.floor(
                drawProbability(1, libraryTotal, 7, card.q) * 100
              )}%`}
            </div>
          ) : (
            <Tooltip
              placement={placement}
              text={
                <DeckDrawProbabilityText N={libraryTotal} n={7} k={card.q} />
              }
            >
              <div>{`${Math.floor(
                drawProbability(1, libraryTotal, 7, card.q) * 100
              )}%`}</div>
            </Tooltip>
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
