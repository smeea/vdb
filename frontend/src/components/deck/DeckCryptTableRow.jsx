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
  OverlayTooltip,
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  DeckCryptDisciplines,
  ResultCryptDisciplines,
  ResultCryptCapacity,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  DeckDrawProbabilityText,
  ConditionalOverlayTrigger,
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
  const { inventoryMode, isMobile, isDesktop, isNarrow, isWide } = useApp();

  const decks = useSnapshot(deckStore).decks;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;
  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 17;

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
                  <div className="flex relative items-center">
                    <div
                      className={
                        card.i
                          ? 'inventory-card-custom'
                          : 'inventory-card-custom not-selected'
                      }
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
              <ConditionalOverlayTrigger
                placement="bottom"
                overlay={<UsedPopover cardid={card.c.Id} />}
                disabled={disableOverlay}
              >
                <td className="quantity">
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
                </td>
              </ConditionalOverlayTrigger>
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
            <ConditionalOverlayTrigger
              placement="bottom"
              overlay={<UsedPopover cardid={card.c.Id} />}
              disabled={disableOverlay}
            >
              <td className="quantity-no-buttons px-1">
                <div
                  className={
                    inMissing
                      ? ''
                      : inInventory < card.q
                      ? 'inv-miss-full'
                      : inInventory < hardUsedTotal + card.q
                      ? 'inv-miss-part'
                      : ''
                  }
                >
                  {card.q || null}
                </div>
              </td>
            </ConditionalOverlayTrigger>
          ) : (
            <td className="quantity-no-buttons px-1">{card.q || null}</td>
          )}
        </>
      )}
      <td
        className={isMobile ? 'capacity' : 'capacity px-1'}
        onClick={() => handleClick(card.c)}
      >
        <ResultCryptCapacity value={card.c.Capacity} />
      </td>
      {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
        <td className="disciplines" onClick={() => handleClick(card.c)}>
          {keyDisciplines &&
          disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
            <DeckCryptDisciplines
              value={card.c.Disciplines}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              nonKeyDisciplines={nonKeyDisciplines}
            />
          ) : (
            <ResultCryptDisciplines
              value={card.c.Disciplines}
              maxDisciplines={maxDisciplines}
            />
          )}
        </td>
      )}

      <ConditionalOverlayTrigger
        placement={placement}
        overlay={<CardPopover card={card.c} />}
        disabled={disableOverlay}
      >
        <td className="name px-2" onClick={() => handleClick(card.c)}>
          <ResultCryptName card={card.c} />
        </td>
      </ConditionalOverlayTrigger>

      {isWide && !(keyDisciplines + nonKeyDisciplines > 6 && inSearch) ? (
        <>
          <td className="title pe-2" onClick={() => handleClick(card.c)}>
            <ResultCryptTitle value={card.c.Title} />
          </td>
          <td className="clan" onClick={() => handleClick(card.c)}>
            <ResultClanImage value={card.c.Clan} />
          </td>
          <td className="group" onClick={() => handleClick(card.c)}>
            <ResultCryptGroup value={card.c.Group} />
          </td>
        </>
      ) : (
        <>
          <td className="clan-group" onClick={() => handleClick(card.c)}>
            <div>
              <ResultClanImage value={card.c.Clan} />
            </div>
            <div className="flex text-xs justify-end">
              <div className="font-bold text-blue">
                <ResultCryptTitle value={card.c.Title} />
              </div>
              <ResultCryptGroup value={card.c.Group} />
            </div>
          </td>
        </>
      )}
      {showInfo && (
        <td className="text-right w-9 px-1">
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
            <OverlayTooltip
              placement="right"
              text={<DeckDrawProbabilityText N={cryptTotal} n={4} k={card.q} />}
            >
              <div>{`${Math.floor(
                drawProbability(1, cryptTotal, 4, card.q) * 100
              )}%`}</div>
            </OverlayTooltip>
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
