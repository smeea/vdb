import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg'
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg'
import ArchiveFill from '../../assets/images/icons/archive-fill.svg'
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg'
import ResultLibraryPopover from './ResultLibraryPopover.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';

function InventoryLibraryTable(props) {
  let resultTrClass;

  const [modalCard, setModalCard] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined)

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      setModalCard(card.c);
      setModalInventory({
        inInventory: card.q,
        usedDescription: {soft: SoftUsedDescription, hard: HardUsedDescription},
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
      });
    }

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

    const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <ResultLibraryPopover card={card.c} showImage={children} />
          </Popover.Content>
        </Popover>
      );
    });
    CardPopover.displayName = 'CardPopover';

    let softUsedMax = 0;
    let SoftUsedDescription;
    if (props.usedCards && props.usedCards.soft[card.c['Id']]) {
      SoftUsedDescription = Object.keys(props.usedCards.soft[card.c['Id']]).map((id, index) => {
        if (softUsedMax < props.usedCards.soft[card.c['Id']][id]) {
          softUsedMax = props.usedCards.soft[card.c['Id']][id];
        }

        return (
          <div className="d-flex align-items-center" key={index}>
          <div className="opacity-035"><Shuffle/></div>
          <div className="px-1"><b>{props.usedCards.soft[card.c['Id']][id]}</b></div>
            - {props.decks[id]['name']}
          </div>
        );
      });
    }

    let hardUsedTotal = 0;
    let HardUsedDescription;
    if (props.usedCards && props.usedCards.hard[card.c['Id']]) {
      HardUsedDescription = Object.keys(props.usedCards.hard[card.c['Id']]).map((id, index) => {
        hardUsedTotal += props.usedCards.hard[card.c['Id']][id];
        return (
          <div className="d-flex align-items-center" key={index}>
            <div className="opacity-035"><PinAngleFill/></div>
            <div className="px-1"><b>{props.usedCards.hard[card.c['Id']][id]}</b></div>
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
              <div className="d-flex align-items-center" key={index}>
                <div className="opacity-035"><ArchiveFill/></div>
                <div className="px-1"><b>{card.q}</b></div>
                - In Inventory
              </div>
            </>
          </Popover.Content>
        </Popover>
      );
    });
    UsedPopover.displayName = 'UsedPopover';

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="quantity">
            <OverlayTrigger
              placement='right'
              overlay={
                <UsedPopover>{softUsedMax || hardUsedTotal}</UsedPopover>
              }
            >
              <div>
                <DeckCardQuantity
                  cardid={card.c['Id']}
                  q={card.q}
                  deckid={props.deckid}
                  cardChange={props.cardChange}
                  isMobile={props.isMobile}
                  inInventory={card.q}
                  inventoryType={true}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                />
              </div>
            </OverlayTrigger>
          </td>
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
          {!props.isMobile ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <CardPopover card={card.c}>{props.showImage}</CardPopover>
             }
           >
             <td className="name px-2" onClick={() => handleClick()}>
               <ResultLibraryName card={card.c}/>
             </td>
           </OverlayTrigger>
           :
           <td className="name px-2" onClick={() => handleClick()}>
             <ResultLibraryName card={card.c}/>
           </td>
          }
          <td className="cost" onClick={() => handleClick()}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle value={card.c['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="inventory-library-table">
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
          inventoryMode={true}
        />
      )}
    </>
  );
}

export default InventoryLibraryTable;
