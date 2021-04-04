import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import DeckDrawProbabilityText from './DeckDrawProbabilityText.jsx';
import DeckDrawProbabilityModal from './DeckDrawProbabilityModal.jsx';
import drawProbability from './drawProbability.js';

function DeckCryptTable(props) {
  let resultTrClass;
  let deckInvType;

  const [modalDraw, setModalDraw] = useState(undefined);

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      props.handleModalCardOpen(card.c);
      props.isMobile && props.setShowFloatingButtons(false);
      props.setModalInventory({
        inInventory: inInventory,
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
        usedDescription: {
          soft: SoftUsedDescription,
          hard: HardUsedDescription,
        },
      });
    };

    let cardInvType;
    if (props.inventoryMode && props.decks[props.deckid]) {
      cardInvType = card.i;
      deckInvType = props.decks[props.deckid].inventory_type;
    }

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (props.inventoryMode && props.deckid) {
      if (Object.keys(props.inventoryCrypt).includes(card.c['Id'].toString())) {
        inInventory = props.inventoryCrypt[card.c['Id']].q;
      } else {
        inInventory = 0;
      }

      if (props.usedCards && props.usedCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          props.usedCards.soft[card.c['Id']]
        ).map((id, index) => {
          if (softUsedMax < props.usedCards.soft[card.c['Id']][id]) {
            softUsedMax = props.usedCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.soft[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        });
      }

      if (props.usedCards && props.usedCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          props.usedCards.hard[card.c['Id']]
        ).map((id, index) => {
          hardUsedTotal += props.usedCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.hard[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        });
      }
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.proxySelected && (
            <td className="proxy-selector">
              <div className="custom-control custom-checkbox">
                <input
                  id={card.c['Id']}
                  name="print"
                  className="custom-control-input"
                  type="checkbox"
                  checked={
                    props.proxySelected[card.c['Id']]
                      ? props.proxySelected[card.c['Id']].print
                      : false
                  }
                  onChange={(e) => props.proxySelector(e)}
                />
                <label
                  htmlFor={card.c['Id']}
                  className="custom-control-label"
                />
              </div>
            </td>
          )}
          {props.isAuthor ? (
            <>
              {props.inventoryMode ? (
                <>
                  {deckInvType && !props.inSearch && !props.isMobile ? (
                    <td className="pt-2 left-offset-8 opacity-075">
                      <div
                        className={cardInvType ? '' : 'opacity-025'}
                        onClick={() =>
                          props.deckUpdate(
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
                    </td>
                  ) : null}
                  {!props.isMobile ? (
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
                          cardChange={props.cardChange}
                          isMobile={props.isMobile}
                          inInventory={inInventory}
                          softUsedMax={softUsedMax}
                          hardUsedTotal={hardUsedTotal}
                          inventoryType={
                            props.decks[props.deckid].inventory_type
                          }
                        />
                      </td>
                    </OverlayTrigger>
                  ) : (
                    <td className="quantity">
                      <DeckCardQuantity
                        cardid={card.c['Id']}
                        q={card.q}
                        deckid={props.deckid}
                        cardChange={props.cardChange}
                        isMobile={props.isMobile}
                        inInventory={inInventory}
                        softUsedMax={softUsedMax}
                        hardUsedTotal={hardUsedTotal}
                        inventoryType={props.decks[props.deckid].inventory_type}
                      />
                    </td>
                  )}
                </>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card.c['Id']}
                    q={card.q}
                    deckid={props.deckid}
                    cardChange={props.cardChange}
                    isMobile={props.isMobile}
                  />
                </td>
              )}
            </>
          ) : props.proxySelected ? (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c['Id']}
                deckid={null}
                q={
                  props.proxySelected[card.c['Id']]
                    ? props.proxySelected[card.c['Id']].q
                    : 0
                }
                cardChange={props.proxyCounter}
                isMobile={props.isMobile}
              />
            </td>
          ) : (
            <>
              {props.inventoryMode ? (
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
                  <td className="quantity-no-buttons px-2">
                    <div
                      className={
                        inInventory < card.q
                          ? 'quantity px-1 mx-1 bg-red'
                          : inInventory - hardUsedTotal < q
                          ? 'quantity px-1 mx-1 bg-yellow'
                          : 'quantity px-1'
                      }
                    >
                      {card.q}
                    </div>
                  </td>
                </OverlayTrigger>
              ) : (
                <td className="quantity-no-buttons px-2">
                  {card.q ? card.q : <div className="transparent">0</div>}
                </td>
              )}
            </>
          )}
          <td
            className={props.isMobile ? 'capacity' : 'capacity px-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          <td
            className={
              props.keyDisciplines + props.nonKeyDisciplines < 8
                ? `disciplines cols-${
                    props.keyDisciplines + props.nonKeyDisciplines
                  }`
                : 'disciplines'
            }
            onClick={() => handleClick()}
          >
            <ResultCryptDisciplines
              value={card.c['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              nonKeyDisciplines={props.nonKeyDisciplines}
              isMobile={props.isMobile}
            />
          </td>
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={
                <CardPopover card={card.c} showImage={props.showImage} />
              }
            >
              <td className="name px-1" onClick={() => handleClick()}>
                <ResultCryptName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          )}
          {props.isMobile || !props.isWide ? (
            <td className="clan-group" onClick={() => handleClick()}>
              <div>
                <ResultCryptClan value={card.c['Clan']} />
              </div>
              <div className="d-flex small justify-content-end">
                <ResultCryptGroup value={card.c['Group']} />
              </div>
            </td>
          ) : (
            <>
              <td className="clan" onClick={() => handleClick()}>
                <ResultCryptClan value={card.c['Clan']} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card.c['Group']} />
              </td>
            </>
          )}
          {props.showInfo && (
            <td className="prob px-1">
              {props.isMobile ? (
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
                  delay={{ show: 0, hide: 0 }}
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

export default DeckCryptTable;
