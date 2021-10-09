import React, { useContext } from 'react';
import { Form, OverlayTrigger } from 'react-bootstrap';
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
import AppContext from '../../context/AppContext.js';

function DeckProxyLibraryTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    isMobile,
  } = useContext(AppContext);

  let resultTrClass;

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

    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (decks && inventoryMode) {
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
          <td className="proxy-selector">
            <Form.Check
              className="px-1"
              type="checkbox"
              id={card.c['Id']}
              name="print"
              checked={
                props.proxySelected[card.c['Id']]
                  ? props.proxySelected[card.c['Id']].print
                  : false
              }
              onChange={(e) => props.handleProxySelector(e)}
            />
          </td>
          {inventoryMode && decks ? (
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
                  deckid={null}
                  q={
                    props.proxySelected[card.c['Id']]
                      ? props.proxySelected[card.c['Id']].q
                      : 0
                  }
                  inProxy={props.inProxy}
                  inInventory={inInventory}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  cardChange={props.handleProxyCounter}
                  isSelected={
                    props.proxySelected[card.c['Id']] &&
                    props.proxySelected[card.c['Id']].print
                  }
                />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c['Id']}
                deckid={null}
                q={
                  props.proxySelected[card.c['Id']]
                    ? props.proxySelected[card.c['Id']].q
                    : 0
                }
                cardChange={props.handleProxyCounter}
              />
            </td>
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
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-library-table">
        <tbody>{cardRows}</tbody>
      </table>
    </>
  );
}

export default DeckProxyLibraryTable;
