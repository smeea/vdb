import React, { useState, useMemo } from 'react';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
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
  DeckDrawProbabilityModal,
  ConditionalOverlayTrigger,
} from 'components';

import { getSoftMax, getHardTotal, drawProbability } from 'utils';
import { useApp } from 'context';

const DeckCryptTable = ({
  deck,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  cards,
  placement,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inSearch,
  inMissing,
  isModalOpen,
}) => {
  const {
    decks,
    inventoryMode,
    inventoryCrypt,
    usedCryptCards,
    isMobile,
    isDesktop,
    isNarrow,
    isWide,
    deckUpdate,
    deckCardChange,
    setShowFloatingButtons,
  } = useApp();
  const { deckid, isPublic, isAuthor } = deck;

  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 17;
  let deckInvType = null; // TODO try refactor?
  if (inventoryMode && deck) {
    deckInvType = deck.inventoryType;
  }

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && isModalOpen),
    [isMobile, isDesktop, isModalOpen]
  );

  const [modalDraw, setModalDraw] = useState(undefined);

  let maxDisciplines = 0;
  cards.map((card) => {
    const n = Object.keys(card.c.Disciplines).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  const handleClick = (idx) => {
    handleModalCardOpen(idx);
    setShowFloatingButtons(false);
  };

  const cardRows = cards.map((card, idx) => {
    let cardInvType = null;
    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      cardInvType = card.i;

      if (inventoryCrypt[card.c.Id]) {
        inInventory = inventoryCrypt[card.c.Id].q;
      }

      if (usedCryptCards) {
        softUsedMax = getSoftMax(usedCryptCards.soft[card.c.Id]);
        hardUsedTotal = getHardTotal(usedCryptCards.hard[card.c.Id]);
      }
    }

    const toggleInventoryState = (deckid, cardid) => {
      const value = cardInvType ? '' : deckInvType === 's' ? 'h' : 's';
      deckUpdate(deckid, 'usedInInventory', {
        [cardid]: value,
      });
    };

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {isAuthor && !isPublic ? (
            <>
              {inventoryMode && decks ? (
                <>
                  {deckInvType && !inSearch && !isMobile && (
                    <td>
                      <div className="d-flex relative align-items-center">
                        <div
                          className={
                            cardInvType
                              ? 'inventory-card-custom'
                              : 'inventory-card-custom not-selected'
                          }
                          onClick={() =>
                            toggleInventoryState(deckid, card.c.Id)
                          }
                        >
                          {deckInvType == 's' ? <PinAngleFill /> : <Shuffle />}
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
                        cardid={card.c.Id}
                        q={card.q}
                        deckid={deckid}
                        cardChange={deckCardChange}
                        inInventory={inInventory}
                        softUsedMax={softUsedMax}
                        hardUsedTotal={hardUsedTotal}
                        inventoryType={decks[deckid].inventoryType}
                      />
                    </td>
                  </ConditionalOverlayTrigger>
                </>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card.c.Id}
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

          {isWide ? (
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
                <div className="d-flex small justify-content-end">
                  <div className="bold blue">
                    <ResultCryptTitle value={card.c.Title} />
                  </div>
                  <ResultCryptGroup value={card.c.Group} />
                </div>
              </td>
            </>
          )}
          {showInfo && (
            <td className="prob px-1">
              {isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card.c['Name'],
                      prob: (
                        <DeckDrawProbabilityText
                          N={cryptTotal}
                          n={4}
                          k={card.q}
                        />
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
                  text={
                    <DeckDrawProbabilityText N={cryptTotal} n={4} k={card.q} />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, cryptTotal, 4, card.q) * 100
                  )}%`}</div>
                </OverlayTooltip>
              )}
            </td>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-crypt-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default DeckCryptTable;
