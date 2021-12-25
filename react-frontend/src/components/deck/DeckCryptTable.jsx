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

import drawProbability from 'components/drawProbability.js';
import { useApp } from 'context';

const DeckCryptTable = (props) => {
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
  } = useApp();

  let resultTrClass;
  let deckInvType = null;
  if (inventoryMode && decks && props.deckid && decks[props.deckid]) {
    deckInvType = decks[props.deckid].inventory_type;
  }

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && props.isModalOpen),
    [isMobile, isDesktop, props.isModalOpen]
  );

  const [modalDraw, setModalDraw] = useState(undefined);

  let maxDisciplines = 0;
  props.cards.map((card) => {
    const n = Object.keys(card.c['Disciplines']).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  const cardRows = props.cards.map((card) => {
    const handleClick = () => {
      props.handleModalCardOpen(card.c);
      isMobile && props.setShowFloatingButtons(false);
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

      if (inventoryCrypt[card.c['Id']]) {
        inInventory = inventoryCrypt[card.c['Id']].q;
      }

      if (usedCryptCards && usedCryptCards.soft[card.c['Id']]) {
        Object.keys(usedCryptCards.soft[card.c['Id']]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card.c['Id']][id]) {
            softUsedMax = usedCryptCards.soft[card.c['Id']][id];
          }
        });
      }

      if (usedCryptCards && usedCryptCards.hard[card.c['Id']]) {
        Object.keys(usedCryptCards.hard[card.c['Id']]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card.c['Id']][id];
        });
      }
    }

    return (
      <React.Fragment key={card.c['Id']}>
        <tr className={resultTrClass}>
          {props.isAuthor ? (
            <>
              {inventoryMode && decks ? (
                <>
                  {deckInvType && !props.inSearch && !isMobile ? (
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
                              props.deckid,
                              cardInvType
                                ? 'makeClear'
                                : deckInvType == 's'
                                ? 'makeFixed'
                                : 'makeFlexible',
                              card.c['Id']
                            )
                          }
                        >
                          {deckInvType == 's' ? <PinAngleFill /> : <Shuffle />}
                        </div>
                      </div>
                    </td>
                  ) : null}

                  <ConditionalOverlayTrigger
                    overlay={<UsedPopover cardid={card.c['Id']} />}
                    disabled={disableOverlay}
                  >
                    <td className="quantity">
                      <DeckCardQuantity
                        cardid={card.c['Id']}
                        q={card.q}
                        deckid={props.deckid}
                        cardChange={deckCardChange}
                        inInventory={inInventory}
                        softUsedMax={softUsedMax}
                        hardUsedTotal={hardUsedTotal}
                        inventoryType={decks[props.deckid].inventory_type}
                      />
                    </td>
                  </ConditionalOverlayTrigger>
                </>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card.c['Id']}
                    q={card.q}
                    deckid={props.deckid}
                    cardChange={deckCardChange}
                  />
                </td>
              )}
            </>
          ) : (
            <>
              {inventoryMode && decks ? (
                <ConditionalOverlayTrigger
                  overlay={<UsedPopover cardid={card.c['Id']} />}
                  disabled={disableOverlay}
                >
                  <td className="quantity-no-buttons px-1">
                    <div
                      className={
                        props.inMissing
                          ? null
                          : inInventory < card.q
                          ? 'inv-miss-part'
                          : inInventory < hardUsedTotal
                          ? 'inv-miss-full'
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
          <td
            className={isMobile ? 'capacity' : 'capacity px-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          {(!props.inSearch || (!isDesktop && !isNarrow) || isWide) && (
            <td className="disciplines" onClick={() => handleClick()}>
              {props.disciplinesSet.length < 13 ? (
                <DeckCryptDisciplines
                  value={card.c['Disciplines']}
                  disciplinesSet={props.disciplinesSet}
                  keyDisciplines={props.keyDisciplines}
                  nonKeyDisciplines={props.nonKeyDisciplines}
                />
              ) : (
                <ResultCryptDisciplines
                  value={card.c['Disciplines']}
                  maxDisciplines={maxDisciplines}
                />
              )}
            </td>
          )}

          <ConditionalOverlayTrigger
            placement={props.placement}
            overlay={<CardPopover card={card.c} />}
            disabled={disableOverlay}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>

          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick()}>
                <ResultCryptTitle value={card.c['Title']} />
              </td>
              <td className="clan" onClick={() => handleClick()}>
                <ResultClanImage value={card.c['Clan']} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card.c['Group']} />
              </td>
            </>
          ) : (
            <>
              <td className="clan-group" onClick={() => handleClick()}>
                <div>
                  <ResultClanImage value={card.c['Clan']} />
                </div>
                <div className="d-flex small justify-content-end">
                  <div className="bold blue">
                    <ResultCryptTitle value={card.c['Title']} />
                  </div>
                  <ResultCryptGroup value={card.c['Group']} />
                </div>
              </td>
            </>
          )}
          {props.showInfo && (
            <td className="prob px-1">
              {isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card.c['Name'],
                      prob: (
                        <DeckDrawProbabilityText
                          N={props.cryptTotal}
                          n={4}
                          k={card.q}
                        />
                      ),
                    })
                  }
                >
                  {`${Math.floor(
                    drawProbability(1, props.cryptTotal, 4, card.q) * 100
                  )}%`}
                </div>
              ) : (
                <OverlayTooltip
                  placement="right"
                  text={
                    <DeckDrawProbabilityText
                      N={props.cryptTotal}
                      n={4}
                      k={card.q}
                    />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, props.cryptTotal, 4, card.q) * 100
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
      <table
        className={
          props.inAdvSelect
            ? 'adv-deck-table deck-crypt-table'
            : 'deck-crypt-table'
        }
      >
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
