import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import ResultAddCard from './ResultAddCard.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import AppContext from '../../context/AppContext.js';

function ResultLibraryTable(props) {
  const {
    decks,
    inventoryLibrary,
    usedLibraryCards,
    addMode,
    inventoryMode,
    nativeLibrary,
    isMobile,
  } = useContext(AppContext);
  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);
  let resultTrClass;

  const handleModalCardChange = (d) => {
    const maxIdx = props.resultCards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  const cardRows = props.resultCards.map((card, index) => {
    const handleClick = () => {
      setModalCardIdx(index);
      isMobile && props.setShowFloatingButtons(false);
      setModalInventory({
        inInventory: inInventory,
        usedDescription: {
          soft: SoftUsedDescription,
          hard: HardUsedDescription,
        },
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
      });
    };

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    let inDeck;
    if (props.library) {
      Object.keys(props.library).map((i) => {
        if (i == card.Id) {
          inDeck = props.library[i].q;
        }
      });
    }

    let inInventory = null;
    if (inventoryMode) {
      if (Object.keys(inventoryLibrary).includes(card['Id'].toString())) {
        inInventory = inventoryLibrary[card['Id']].q;
      } else {
        inInventory = 0;
      }
    }

    let softUsedMax = 0;
    let SoftUsedDescription;

    if (usedLibraryCards.soft[card['Id']]) {
      SoftUsedDescription = Object.keys(usedLibraryCards.soft[card['Id']]).map(
        (id) => {
          if (softUsedMax < usedLibraryCards.soft[card['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card['Id']][id];
          }
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.soft[card['Id']][id]}
              deckName={decks[id]['name']}
              t="s"
            />
          );
        }
      );
    }

    let hardUsedTotal = 0;
    let HardUsedDescription;
    if (usedLibraryCards.hard[card['Id']]) {
      HardUsedDescription = Object.keys(usedLibraryCards.hard[card['Id']]).map(
        (id) => {
          hardUsedTotal += usedLibraryCards.hard[card['Id']][id];
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.hard[card['Id']][id]}
              deckName={decks[id]['name']}
              t="h"
            />
          );
        }
      );
    }

    return (
      <React.Fragment key={card['Id']}>
        <tr className={resultTrClass}>
          {addMode && (
            <td className="quantity-add pr-1">
              <ResultAddCard
                cardAdd={props.cardAdd}
                cardChange={props.cardChange}
                cardid={card['Id']}
                deckid={props.activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          {inventoryMode && (
            <OverlayTrigger
              placement="left"
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
                <div
                  className={
                    inInventory < softUsedMax + hardUsedTotal
                      ? 'd-flex align-items-center justify-content-center quantity px-1 ml-1 inv-miss-full'
                      : 'd-flex align-items-center justify-content-center quantity px-1 ml-1'
                  }
                >
                  {inInventory > 0 && (
                    <>
                      <div className="pr-1 opacity-035">
                        <ArchiveFill
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                        />
                      </div>
                      {inInventory}
                    </>
                  )}
                </div>
              </td>
            </OverlayTrigger>
          )}
          <td className="cost px-1" onClick={() => handleClick()}>
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick()}>
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryDisciplines value={card['Discipline']} />
            <ResultLibraryClan value={card['Clan']} />
          </td>
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} />}
            >
              <td className="name px-1" onClick={() => handleClick()}>
                <ResultLibraryName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          )}
          <td className="burn px-1" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="search-library-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={props.resultCards[modalCardIdx]}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
          inventoryState={modalInventory}
        />
      )}
    </>
  );
}

export default ResultLibraryTable;
