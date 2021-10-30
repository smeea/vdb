import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
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
    deckUpdate,
    deckCardChange,
  } = useContext(AppContext);

  let resultTrClass;
  let deckInvType = null;
  if (inventoryMode && decks && props.deckid && decks[props.deckid]) {
    deckInvType = decks[props.deckid].inventory_type;
  }

  const [modalDraw, setModalDraw] = useState(undefined);

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

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    let cardInvType = null;
    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      cardInvType = card.i;

      if (inventoryLibrary[card.c['Id']]) {
        inInventory = inventoryLibrary[card.c['Id']].q;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c['Id']]) {
        Object.keys(usedLibraryCards.soft[card.c['Id']]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card.c['Id']][id];
          }
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c['Id']]) {
        Object.keys(usedLibraryCards.hard[card.c['Id']]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c['Id']][id];
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
                  {deckInvType && !props.inSearch ? (
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
                      overlay={<UsedPopover cardid={card.c['Id']} />}
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
                      overlay={<UsedPopover cardid={card.c['Id']} />}
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
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card.c} />}
            >
              <td className="name ps-3 pe-2" onClick={() => handleClick()}>
                <ResultLibraryName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name ps-3 pe-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          )}
          <td
            className={card.c['Blood Cost'] ? 'cost blood' : 'cost'}
            onClick={() => handleClick()}
          >
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
      <table
        className={
          props.inAdvSelect
            ? 'adv-deck-table deck-library-table'
            : 'deck-library-table'
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

export default DeckLibraryTable;
