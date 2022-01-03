import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import ArrowUp from 'assets/images/icons/arrow-up.svg';
import Dash from 'assets/images/icons/dash.svg';
import {
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  DeckCryptDisciplines,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ResultCryptDisciplines,
  ResultCryptCapacity,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  OverlayTooltip,
  ConditionalOverlayTrigger,
} from 'components';

import { getSoftMax, getHardTotal, drawProbability } from 'utils';
import { useApp } from 'context';

function DiffCryptTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryCrypt,
    usedCryptCards,
    isMobile,
    isWide,
    deckCardChange,
  } = useApp();

  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 20;
  let resultTrClass;

  const [modalDraw, setModalDraw] = useState(undefined);

  let maxDisciplines = 0;
  props.cards.map((card) => {
    const n = Object.keys(card.c.Disciplines).length;
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

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      if (inventoryCrypt[card.c.Id]) {
        inInventory = inventoryCrypt[card.c.Id].q;
      }

      if (usedCryptCards) {
        softUsedMax = getSoftMax(usedCryptCards.soft[card.Id]);
        hardUsedTotal = getHardTotal(usedCryptCards.hard[card.Id]);
      }
    }

    const qFrom = props.cardsFrom[card.c.Id] ? props.cardsFrom[card.c.Id].q : 0;
    const qTo = props.cardsTo[card.c.Id] ? props.cardsTo[card.c.Id].q : 0;

    const DiffStatus = () => {
      if (qFrom == qTo) {
        return '';
      } else if (qTo == 0) {
        return (
          <div className="red">
            <Dash viewBox="0 0 12 12" />
          </div>
        );
      } else if (qFrom > qTo) {
        return (
          <div className="red">
            <ArrowDown /> {qFrom - qTo}
          </div>
        );
      } else if (qFrom < qTo) {
        return (
          <div className="green">
            <ArrowUp /> {qTo - qFrom}
          </div>
        );
      }
    };

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={resultTrClass}>
          {props.isAuthor ? (
            <>
              {inventoryMode && decks ? (
                <OverlayTrigger
                  placement="right"
                  overlay={<UsedPopover cardid={card.c.Id} />}
                >
                  <td className="quantity">
                    <DeckCardQuantity
                      cardid={card.c.Id}
                      q={qFrom}
                      deckid={props.deckid}
                      cardChange={deckCardChange}
                      inInventory={inInventory}
                      softUsedMax={softUsedMax}
                      hardUsedTotal={hardUsedTotal}
                      inventoryType={decks[props.deckid].inventory_type}
                    />
                  </td>
                </OverlayTrigger>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card.c.Id}
                    q={qFrom}
                    deckid={props.deckid}
                    cardChange={deckCardChange}
                  />
                </td>
              )}
            </>
          ) : (
            <td className="quantity-no-buttons px-1">{qFrom ? qFrom : null}</td>
          )}
          <td className={`diff-status ${!isMobile && 'ps-1'}`}>
            <DiffStatus />
          </td>
          <td
            className={isMobile ? 'capacity' : 'capacity pe-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c.Capacity} />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            {props.disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
              <DeckCryptDisciplines
                value={card.c.Disciplines}
                disciplinesSet={props.disciplinesSet}
                keyDisciplines={props.keyDisciplines}
                nonKeyDisciplines={props.nonKeyDisciplines}
              />
            ) : (
              <ResultCryptDisciplines
                value={card.c.Disciplines}
                maxDisciplines={maxDisciplines}
              />
            )}
          </td>

          <ConditionalOverlayTrigger
            placement={props.placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>
          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick()}>
                <ResultCryptTitle value={card.c.Title} />
              </td>
              <td className="clan" onClick={() => handleClick()}>
                <ResultClanImage value={card.c.Clan} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card.c.Group} />
              </td>
            </>
          ) : (
            <>
              <td className="clan-group" onClick={() => handleClick()}>
                <div>
                  <ResultClanImage value={card.c.Clan} />
                </div>
                <div className="d-flex small justify-content-end">
                  <b>
                    <ResultCryptTitle value={card.c.Title} />
                  </b>
                  <ResultCryptGroup value={card.c.Group} />
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
}

export default DiffCryptTable;
