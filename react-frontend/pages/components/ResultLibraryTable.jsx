import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg'
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg'
import ArchiveFill from '../../assets/images/icons/archive-fill.svg'
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg'
import ResultLibraryPopover from './ResultLibraryPopover.jsx';
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
  const [modalInventory, setModalInventory] = useState(undefined)

  const cardRows = props.resultCards.map((card, index) => {
    const handleClick = () => {
      setModalCard(card);
      setModalInventory({
        inInventory: inInventory,
        usedDescription: {soft: SoftUsedDescription, hard: HardUsedDescription},
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
      });
    }

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
      SoftUsedDescription = Object.keys(props.usedCards.soft[card['Id']]).map((id, index) => {
        if (softUsedMax < props.usedCards.soft[card['Id']][id]) {
          softUsedMax = props.usedCards.soft[card['Id']][id];
        }

        return (
          <div className="d-flex align-items-center" key={index}>
            <div className="opacity-035"><Shuffle/></div>
            <div className="px-1"><b>{props.usedCards.soft[card['Id']][id]}</b></div>
            - {props.decks[id]['name']}
          </div>
        );
      });
    }

    let hardUsedTotal = 0;
    let HardUsedDescription;
    if (props.usedCards.hard[card['Id']]) {
      HardUsedDescription = Object.keys(props.usedCards.hard[card['Id']]).map((id, index) => {
        hardUsedTotal += props.usedCards.hard[card['Id']][id];
        return (
          <div className="d-flex align-items-center" key={index}>
            <div className="opacity-035"><PinAngleFill/></div>
            <div className="px-1"><b>{props.usedCards.hard[card['Id']][id]}</b></div>
            - {props.decks[id]['name']}
          </div>
        );
      });
    }

    const UsedPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <>
              {children == 0 ?
               <div className="py-1">
                 Not used in inventory decks
               </div>
               :
               <>
                 {softUsedMax > 0 && <>{SoftUsedDescription}</>}
                 {hardUsedTotal > 0 && <>{HardUsedDescription}</>}
               </>
              }
              <hr/>
              <div className="d-flex align-items-center">
                <div className="opacity-035"><CalculatorFill/></div>
                <div className="px-1"><b>{softUsedMax + hardUsedTotal}</b></div>
                - Total Used
              </div>
              <div className="d-flex align-items-center">
                <div className="opacity-035"><ArchiveFill/></div>
                <div className="px-1"><b>{inInventory}</b></div>
                - In Inventory
              </div>
            </>
          </Popover.Content>
        </Popover>
      );
    });
    UsedPopover.displayName = 'UsedPopover';

    const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <ResultLibraryPopover card={card} showImage={children} />
          </Popover.Content>
        </Popover>
      );
    });
    CardPopover.displayName = 'CardPopover';

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
                placement='left'
                overlay={
                  <UsedPopover>{softUsedMax || hardUsedTotal}</UsedPopover>
                }
              >
                <td className="quantity px-1">
                  <div className={inInventory < softUsedMax + hardUsedTotal ? "quantity px-1 mx-1 bg-red" : "quantity px-1"}>
                    {inInventory > 0 && inInventory}
                  </div>
                </td>
              </OverlayTrigger>
              <td className="used">
                { softUsedMax > 0 &&
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pr-1"><Shuffle/></div>{softUsedMax}
                  </div>
                }
                { hardUsedTotal > 0 &&
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pr-1"><PinAngleFill/></div>{hardUsedTotal}
                  </div>
                }
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
          {!props.isMobile ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <CardPopover card={card}>{props.showImage}</CardPopover>
             }
           >
             <td className="name px-1" onClick={() => handleClick()}>
               <ResultLibraryName card={card} />
             </td>
           </OverlayTrigger>
           :
           <td className="name px-1" onClick={() => handleClick()}>
             <ResultLibraryName card={card} />
           </td>
          }
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
          handleClose={() => setModalCard(false)}
          isMobile={props.isMobile}
          inventoryState={modalInventory}
          inventoryMode={props.inventoryMode}
        />
      )}
    </>
  );
}

export default ResultLibraryTable;
