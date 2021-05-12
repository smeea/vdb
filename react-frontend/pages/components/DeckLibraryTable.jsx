import React, { useState, useContext } from 'react';
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
import AppContext from '../../context/AppContext.js';

function DeckLibraryTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    isMobile,
  } = useContext(AppContext);

  let resultTrClass;
  let deckInvType = null;
  if (decks && props.deckid) {
    if (inventoryMode && decks[props.deckid]) {
      deckInvType = decks[props.deckid].inventory_type;
    }
  }

  const [modalDraw, setModalDraw] = useState(undefined);

  const cardRows = props.cards.map((card) => {
    const handleClick = () => {
      props.handleModalCardOpen(card.c);
      isMobile && props.setShowFloatingButtons(false);
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

    if (inventoryMode && props.deckid) {
      cardInvType = card.i;

      if (Object.keys(inventoryLibrary).includes(card.c['Id'].toString())) {
        inInventory = inventoryLibrary[card.c['Id']].q;
      } else {
        inInventory = 0;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          usedLibraryCards.soft[card.c['Id']]
        ).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.soft[card.c['Id']][id]}
              deckName={decks[id]['name']}
              t="s"
            />
          );
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          usedLibraryCards.hard[card.c['Id']]
        ).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.hard[card.c['Id']][id]}
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
              {inventoryMode ? (
                <>
                  {deckInvType && !props.inSearch ? (
                    <td className="d-flex align-items-center inventory-card-custom">
                      <div
                        className={cardInvType ? '' : 'not-selected'}
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
                  {!isMobile ? (
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
                        cardid={card.c['Id']}
                        q={card.q}
                        deckid={props.deckid}
                        cardChange={props.cardChange}
                        inInventory={inInventory}
                        softUsedMax={softUsedMax}
                        hardUsedTotal={hardUsedTotal}
                        inventoryType={decks[props.deckid].inventory_type}
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
              />
            </td>
          ) : (
            <>
              {inventoryMode ? (
                <>
                  {isMobile ? (
                    <td className="quantity-no-buttons px-1">
                      <div
                        className={
                          inInventory < card.q
                            ? 'inv-miss-full'
                            : inInventory - hardUsedTotal < card.q
                            ? 'inv-miss-part'
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
                            inInventory < card.q
                              ? 'inv-miss-full'
                              : inInventory - hardUsedTotal < card.q
                              ? 'inv-miss-part'
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
                  {card.q ? card.q : <div className="transparent">0</div>}
                </td>
              )}
            </>
          )}
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card.c} />}
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
            <ResultLibraryTrifle
              value={nativeLibrary[card.c.Id]['Card Text']}
            />
          </td>
          {props.showInfo && (
            <td className="prob px-1">
              {isMobile ? (
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
