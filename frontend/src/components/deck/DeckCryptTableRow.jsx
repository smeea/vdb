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
  UsedPopover,
  DeckCardQuantity,
  ResultCryptTableRowCommon,
  DeckDrawProbabilityText,
  Tooltip,
} from 'components';
import { getSoftMax, getHardTotal, drawProbability } from 'utils';

const DeckCryptTableRow = ({
  idx,
  disableOverlay,
  placement,
  handleClick,
  card,
  deck,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  maxDisciplines,
  showInfo,
  cryptTotal,
  inSearch,
  inMissing,
  setModalDraw,
}) => {
  const { inventoryMode, isMobile } = useApp();

  const decks = useSnapshot(deckStore).decks;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
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

  let inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  let softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
  let hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

  const toggleInventoryState = (deckid, cardid) => {
    const value = card.i ? '' : deck.inventoryType === 's' ? 'h' : 's';
    deckUpdate(deckid, 'usedInInventory', {
      [cardid]: value,
    });
  };

  return (
    <tr
      {...swipeHandlers}
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      } ${isSwiped ? `swiped-${isSwiped}` : ''}
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
                <Tooltip
                  placement="bottom"
                  overlay={<UsedPopover cardid={card.c.Id} />}
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
                </Tooltip>
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
            <td className="quantity-no-buttons">
              <Tooltip
                placement="bottom"
                overlay={<UsedPopover cardid={card.c.Id} />}
                disabled={disableOverlay}
              >
                <div
                  className={
                    inMissing
                      ? ''
                      : inInventory < card.q
                      ? 'bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark'
                      : inInventory < hardUsedTotal + card.q
                      ? 'bg-bgWarning dark:bg-bgWarningDark'
                      : ''
                  }
                >
                  {card.q || null}
                </div>
              </Tooltip>
            </td>
          ) : (
            <td className="quantity-no-buttons">{card.q || null}</td>
          )}
        </>
      )}
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
        maxDisciplines={maxDisciplines}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        disciplinesSet={disciplinesSet}
        inSearch={inSearch}
        inDeck
      />
      {showInfo && (
        <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
          {isMobile ? (
            <div
              onClick={() =>
                setModalDraw({
                  name: card.c['Name'],
                  prob: (
                    <DeckDrawProbabilityText N={cryptTotal} n={4} k={card.q} />
                  ),
                })
              }
            >
              {`${Math.floor(
                drawProbability(1, cryptTotal, 4, card.q) * 100
              )}%`}
            </div>
          ) : (
            <Tooltip
              placement="right"
              text={<DeckDrawProbabilityText N={cryptTotal} n={4} k={card.q} />}
            >
              <div>{`${Math.floor(
                drawProbability(1, cryptTotal, 4, card.q) * 100
              )}%`}</div>
            </Tooltip>
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
