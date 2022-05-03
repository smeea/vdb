import React, { useState, useMemo } from 'react';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import {
  OverlayTooltip,
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ConditionalOverlayTrigger,
} from 'components';

import { drawProbability } from 'utils';
import { useApp } from 'context';

const DeckLibraryTable = ({
  deckid,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  cards,
  cardsFrom,
  cardsTo,
  isPublic,
  isAuthor,
  placement,
  showInfo,
  libraryTotal,
  handleModalCardOpen,
  setShowFloatingButtons,
  inSearch,
  inMissing,
  isModalOpen,
}) => {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    isMobile,
    isDesktop,
    isNarrow,
    isWide,
    deckUpdate,
    deckCardChange,
  } = useApp();

  let resultTrClass;
  let deckInvType = null;
  if (inventoryMode && decks && deckid && decks[deckid]) {
    deckInvType = decks[deckid].inventory_type;
  }

  const [modalDraw, setModalDraw] = useState(undefined);

  cards.sort((a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
  });

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && isModalOpen),
    [isMobile, isDesktop, isModalOpen]
  );

  const cardRows = cards.map((card) => {
    const handleClick = () => {
      handleModalCardOpen(card.c);
      isNarrow && setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let cardInvType = null;
    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      cardInvType = card.i;

      if (inventoryLibrary[card.c.Id]) {
        inInventory = inventoryLibrary[card.c.Id].q;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c.Id]) {
        Object.keys(usedLibraryCards.soft[card.c.Id]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c.Id][id]) {
            softUsedMax = usedLibraryCards.soft[card.c.Id][id];
          }
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c.Id]) {
        Object.keys(usedLibraryCards.hard[card.c.Id]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c.Id][id];
        });
      }
    }

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={resultTrClass}>
          {isAuthor && !isPublic ? (
            <>
              {inventoryMode && decks ? (
                <>
                  {deckInvType && !inSearch ? (
                    <td>
                      <div className="d-flex relative align-items-center">
                        <div
                          className={
                            cardInvType
                              ? 'inventory-card-custom'
                              : 'inventory-card-custom not-selected'
                          }
                          onClick={() =>
                            deckUpdate(
                              deckid,
                              cardInvType
                                ? 'makeClear'
                                : deckInvType == 's'
                                ? 'makeFixed'
                                : 'makeFlexible',
                              card.c.Id
                            )
                          }
                        >
                          {deckInvType == 's' ? <PinAngleFill /> : <Shuffle />}
                        </div>
                      </div>
                    </td>
                  ) : null}

                  <ConditionalOverlayTrigger
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
                        inventoryType={decks[deckid].inventory_type}
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
                  overlay={<UsedPopover cardid={card.c.Id} />}
                  disabled={disableOverlay}
                >
                  <td className="quantity-no-buttons px-1">
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
                  </td>
                </ConditionalOverlayTrigger>
              ) : (
                <td className="quantity-no-buttons px-1">{card.q || null}</td>
              )}
            </>
          )}
          {!isMobile ? (
            <ConditionalOverlayTrigger
              placement={placement}
              overlay={<CardPopover card={card.c} />}
              disabled={disableOverlay}
            >
              <td className="name ps-3 pe-2" onClick={() => handleClick()}>
                <ResultLibraryName card={card.c} />
              </td>
            </ConditionalOverlayTrigger>
          ) : (
            <td className="name ps-3 pe-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          )}
          {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
            <td
              className={card.c['Blood Cost'] ? 'cost blood' : 'cost'}
              onClick={() => handleClick()}
            >
              <ResultLibraryCost
                valueBlood={card.c['Blood Cost']}
                valuePool={card.c['Pool Cost']}
              />
            </td>
          )}
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryClan value={card.c.Clan} />
            {card.c.Discipline && card.c.Clan && '+'}
            <ResultLibraryDisciplines value={card.c.Discipline} />
          </td>
          {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
            <td className="burn" onClick={() => handleClick()}>
              <ResultLibraryBurn value={card.c['Burn Option']} />
              <ResultLibraryTrifle
                value={nativeLibrary[card.c.Id]['Card Text']}
              />
            </td>
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
                <OverlayTooltip
                  placement="right"
                  text={
                    <DeckDrawProbabilityText
                      N={libraryTotal}
                      n={7}
                      k={card.q}
                    />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, libraryTotal, 7, card.q) * 100
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
      <table className="deck-library-table">
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

export default DeckLibraryTable;
