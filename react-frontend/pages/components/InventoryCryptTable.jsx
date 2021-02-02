import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
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

  const cardRows = props.cards.map((card, index) => {
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

    let used = 0;

    let SoftUsed;
    if (props.consumedCards.soft[card.c['Id']]) {
      SoftUsed = Object.keys(props.consumedCards.soft[card.c['Id']]).map((id, index) => {
        used += props.consumedCards.soft[card.c['Id']][id];
        return (
          <div key={index}>
            <b>{props.consumedCards.soft[card.c['Id']][id]}</b> - {props.decks[id]['name']}
          </div>
        );
      });
    }

    let HardUsed;
    if (props.consumedCards.hard[card.c['Id']]) {
      HardUsed = Object.keys(props.consumedCards.hard[card.c['Id']]).map((id, index) => {
        used += props.consumedCards.hard[card.c['Id']][id];
        return (
          <div key={index}>
            <b>{props.consumedCards.hard[card.c['Id']][id]}</b> - {props.decks[id]['name']}
          </div>
        );
      });
    }

    const UsedPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            {SoftUsed &&
             <div className="py-1">
               <b>Soft:</b>
               {SoftUsed}
             </div>
            }
            {HardUsed &&
             <div className="py-1">
               <b>Hard</b>:
               {HardUsed}
             </div>
            }
          </Popover.Content>
        </Popover>
      );
    });
    UsedPopover.displayName = 'UsedPopover';

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.isAuthor ? (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c['Id']}
                q={card.q}
                deckid={props.deckid}
                cardChange={props.cardChange}
                isMobile={props.isMobile}
              />
            </td>
          ) : card.q ? (
            <td className="quantity-no-buttons px-2">{card.q}</td>
          ) : (
            <td className="quantity-no-buttons px-2">
              <div className="transparent">0</div>
            </td>
          )}
          {!props.isMobile && used ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <UsedPopover>{true}</UsedPopover>
             }
           >
             <td className="quantity-no-buttons px-2">
               {used}
             </td>
           </OverlayTrigger>
           :
           <td className="quantity-no-buttons px-2">
           </td>
          }
          <td className="capacity pr-1 pl-2" onClick={() => setModalCard(card.c)}>
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          <td
            className='disciplines px-1'
            onClick={() => setModalCard(card.c)}
          >
            <ResultCryptDisciplines
              value={card.c['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              nonKeyDisciplines={props.nonKeyDisciplines}
              isMobile={props.isMobile}
            />
          </td>
          {!props.isMobile ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <CardPopover card={card.c}>{props.showImage}</CardPopover>
             }
           >
             <td className="name px-1" onClick={() => setModalCard(card.c)}>
               <ResultCryptName card={card.c} />
             </td>
           </OverlayTrigger>
           :
           <td className="name px-1" onClick={() => setModalCard(card)}>
             <ResultCryptName card={card.c} />
           </td>
          }
          {props.isMobile || !props.isWide ? (
            <td className="clan-group" onClick={() => setModalCard(card.c)}>
              <div>
                <ResultCryptClan value={card.c['Clan']} />
              </div>
              <div className="d-flex small justify-content-end">
                <ResultCryptGroup value={card.c['Group']} />
              </div>
            </td>
          ) : (
            <>
              <td className="clan" onClick={() => setModalCard(card)}>
                <ResultCryptClan value={card.c['Clan']} />
              </td>
              <td className="group" onClick={() => setModalCard(card)}>
                <ResultCryptGroup value={card.c['Group']} />
              </td>
            </>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-crypt-table">
        <thead>
          <tr>
            <th>Total</th>
            <th>Used</th>
          </tr>
        </thead>
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
        />
      )}
    </>
  );
}

export default InventoryCryptTable;
