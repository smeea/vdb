import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg'
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg'
import ArchiveFill from '../../assets/images/icons/archive-fill.svg'
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg'
import ResultCryptPopover from './ResultCryptPopover.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function InventoryCryptTable(props) {
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

    const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <ResultCryptPopover card={props.card} showImage={children} />
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
              <div className="d-flex align-items-center">
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
              placement={props.placement ? props.placement : 'right'}
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
          <td className="capacity" onClick={() => handleClick()}>
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          {!props.isMobile &&
           <td
             className='disciplines'
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
          }
          {!props.isMobile ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <CardPopover card={card.c}>{props.showImage}</CardPopover>
             }
           >
             <td className="name pl-2" onClick={() => handleClick()}>
               <ResultCryptName card={card.c} />
             </td>
           </OverlayTrigger>
           :
           <td className="name pl-2" onClick={() => handleClick()}>
             <ResultCryptName card={card.c} />
           </td>
          }
          <td className="clan" onClick={() => handleClick()}>
            <ResultCryptClan value={card.c['Clan']} />
          </td>
          <td className="group" onClick={() => handleClick()}>
            <ResultCryptGroup value={card.c['Group']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="inventory-crypt-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCard && (
        <ResultCryptModal
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

export default InventoryCryptTable;
