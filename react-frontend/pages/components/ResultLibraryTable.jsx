import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
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

function ResultLibraryTable(props) {
  let resultTrClass;

  const [modalCard, setModalCard] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const cardRows = props.resultCards.map((card, index) => {
    const handleClick = () => {
      setModalCard(card);
      props.isMobile && props.setShowFloatingButtons(false);
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
      Object.keys(props.library).map((i, index) => {
        if (i == card.Id) {
          inDeck = props.library[i].q;
        }
      });
    }

    let inInventory = null;
    if (props.inventoryMode) {
      if (Object.keys(props.inventoryLibrary).includes(card['Id'].toString())) {
        inInventory = props.inventoryLibrary[card['Id']].q;
      } else {
        inInventory = 0;
      }
    }

    let softUsedMax = 0;
    let SoftUsedDescription;

    if (props.usedCards.soft[card['Id']]) {
      SoftUsedDescription = Object.keys(props.usedCards.soft[card['Id']]).map(
        (id, index) => {
          if (softUsedMax < props.usedCards.soft[card['Id']][id]) {
            softUsedMax = props.usedCards.soft[card['Id']][id];
          }
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.soft[card['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        }
      );
    }

    let hardUsedTotal = 0;
    let HardUsedDescription;
    if (props.usedCards.hard[card['Id']]) {
      HardUsedDescription = Object.keys(props.usedCards.hard[card['Id']]).map(
        (id, index) => {
          hardUsedTotal += props.usedCards.hard[card['Id']][id];
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.hard[card['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        }
      );
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.addMode && (
            <td className="quantity-add">
              <ResultAddCard
                cardAdd={props.cardAdd}
                cardid={card['Id']}
                inDeck={inDeck}
                card={card}
              />
            </td>
          )}
          {props.inventoryMode && (
            <>
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
                <td className="quantity px-1">
                  <div
                    className={
                      inInventory < softUsedMax + hardUsedTotal
                        ? 'quantity px-1 mx-1 bg-red'
                        : 'quantity px-1'
                    }
                  >
                    {inInventory > 0 && inInventory}
                  </div>
                </td>
              </OverlayTrigger>
              <td className="used">
                {softUsedMax > 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pr-1">
                      <Shuffle />
                    </div>
                    {softUsedMax}
                  </div>
                )}
                {hardUsedTotal > 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pr-1">
                      <PinAngleFill />
                    </div>
                    {hardUsedTotal}
                  </div>
                )}
              </td>
            </>
          )}
          <td className="cost py-0 px-1" onClick={() => handleClick()}>
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
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} showImage={props.showImage} />}
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
            <ResultLibraryTrifle value={card['Card Text']} />
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
      {modalCard && (
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => {
            setModalCard(false);
            props.isMobile && props.setShowFloatingButtons(true);
          }}
          isMobile={props.isMobile}
          inventoryState={modalInventory}
          inventoryMode={props.inventoryMode}
        />
      )}
    </>
  );
}

export default ResultLibraryTable;
