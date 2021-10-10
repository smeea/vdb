import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import DeckCryptDisciplines from './DeckCryptDisciplines.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptTitle from './ResultCryptTitle.jsx';
import DeckDrawProbabilityText from './DeckDrawProbabilityText.jsx';
import DeckDrawProbabilityModal from './DeckDrawProbabilityModal.jsx';
import drawProbability from './drawProbability.js';
import AppContext from '../../context/AppContext';

function DeckCryptTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryCrypt,
    usedCryptCards,
    isMobile,
    isWide,
    deckUpdate,
    deckCardChange,
  } = useContext(AppContext);

  let resultTrClass;
  let deckInvType = null;
  if (inventoryMode && decks && props.deckid && decks[props.deckid]) {
    deckInvType = decks[props.deckid].inventory_type;
  }

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
    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (decks && inventoryMode) {
      cardInvType = card.i;

      if (Object.keys(inventoryCrypt).includes(card.c['Id'].toString())) {
        inInventory = inventoryCrypt[card.c['Id']].q;
      } else {
        inInventory = 0;
      }

      if (usedCryptCards && usedCryptCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          usedCryptCards.soft[card.c['Id']]
        ).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card.c['Id']][id]) {
            softUsedMax = usedCryptCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={id}
              q={usedCryptCards.soft[card.c['Id']][id]}
              deckName={decks[id]['name']}
              t="s"
            />
          );
        });
      }

      if (usedCryptCards && usedCryptCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          usedCryptCards.hard[card.c['Id']]
        ).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={id}
              q={usedCryptCards.hard[card.c['Id']][id]}
              deckName={decks[id]['name']}
              t="h"
            />
          );
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
                  {isMobile ? (
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
                  ) : (
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <UsedPopover
                          softUsedMax={softUsedMax}
                          hardUsedTotal={hardUsedTotal}
                          inInventory={inInventory}
                          SoftUsedDescription={SoftUsedDescription}
                          HardUsedDescription={HardUsedDescription}
                        />
                      }
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
                    </OverlayTrigger>
                  )}
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
                <>
                  {isMobile ? (
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
                        {card.q}
                      </div>
                    </td>
                  ) : (
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <UsedPopover
                          softUsedMax={softUsedMax}
                          hardUsedTotal={hardUsedTotal}
                          inInventory={inInventory}
                          SoftUsedDescription={SoftUsedDescription}
                          HardUsedDescription={HardUsedDescription}
                        />
                      }
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
                          {card.q}
                        </div>
                      </td>
                    </OverlayTrigger>
                  )}
                </>
              ) : (
                <td className="quantity-no-buttons px-1">
                  {card.q ? card.q : null}
                </td>
              )}
            </>
          )}
          <td
            className={isMobile ? 'capacity' : 'capacity px-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
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
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card.c} />}
            >
              <td className="name px-2" onClick={() => handleClick()}>
                <ResultCryptName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          )}
          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick()}>
                <ResultCryptTitle value={card.c['Title']} />
              </td>
              <td className="clan" onClick={() => handleClick()}>
                <ResultCryptClan value={card.c['Clan']} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card.c['Group']} />
              </td>
            </>
          ) : (
            <>
              <td className="clan-group" onClick={() => handleClick()}>
                <div>
                  <ResultCryptClan value={card.c['Clan']} />
                </div>
                <div className="d-flex small justify-content-end">
                  <b>
                    <ResultCryptTitle value={card.c['Title']} />
                  </b>
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
}

export default DeckCryptTable;
