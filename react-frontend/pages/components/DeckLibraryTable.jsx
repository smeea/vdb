import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import DeckDrawProbabilityText from './DeckDrawProbabilityText.jsx';
import DeckDrawProbabilityModal from './DeckDrawProbabilityModal.jsx';
import drawProbability from './drawProbability.js';

function DeckLibraryTable(props) {
  let resultTrClass;
  let deckInvType = null;
  if (props.decks && props.deckid) {
    if (props.inventoryMode && props.decks[props.deckid]) {
      deckInvType = props.decks[props.deckid].inventory_type;
    }
  }

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

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    let cardInvType = null;
    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (props.inventoryMode && props.deckid) {
      cardInvType = card.i;

      if (
        Object.keys(props.inventoryLibrary).includes(card.c['Id'].toString())
      ) {
        inInventory = props.inventoryLibrary[card.c['Id']].q;
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
                  {deckInvType && !props.inSearch ? (
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
                          : inInventory - hardUsedTotal < card.q
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
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={
                <CardPopover card={card.c} showImage={props.showImage} />
              }
            >
              <td className="name pl-3 pr-2" onClick={() => handleClick()}>
                <ResultLibraryName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name pl-3 pr-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          )}
          <td className="cost" onClick={() => handleClick()}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle value={card.c['Card Text']} />
          </td>
          {props.showInfo && (
            <td className="prob px-1">
              {props.isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card.c['Name'],
                      prob: (
                        <DeckDrawProbabilityText
                          N={props.libraryTotal}
                          n={7}
                          k={card.q}
                        />
                      ),
                    })
                  }
                >
                  {`${Math.floor(
                    drawProbability(1, props.libraryTotal, 7, card.q) * 100
                  )}%`}
                </div>
              ) : (
                <OverlayTooltip
                  delay={{ show: 0, hide: 0 }}
                  placement="right"
                  text={
                    <DeckDrawProbabilityText
                      N={props.libraryTotal}
                      n={7}
                      k={card.q}
                    />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, props.libraryTotal, 7, card.q) * 100
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
}

export default DeckLibraryTable;
