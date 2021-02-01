import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
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

  const [showModal, setShowModal] = useState(undefined);

  const cardLines = props.cards.map((card, index) => {
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

    let used = 0;
    let UsedDetails;
    if (props.consumedCards[card.c['Id']]) {
      UsedDetails = Object.keys(props.consumedCards[card.c['Id']]).map((id, index) => {
        used += props.consumedCards[card.c['Id']][id];
        return (
          <div key={index}>
            {props.decks[id]['name']}: {props.consumedCards[card.c['Id']][id]}
          </div>
        )
      })
    }

    const UsedPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            {UsedDetails}
          </Popover.Content>
        </Popover>
      );
    });
    UsedPopover.displayName = 'UsedPopover';

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.isAuthor ? (
            <td className="quantity pr-1">
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
          {!props.isMobile ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <CardPopover card={card.c}>{props.showImage}</CardPopover>
             }
           >
             <td className="name px-1" onClick={() => setShowModal(card.c)}>
               <ResultLibraryName card={card.c}/>
             </td>
           </OverlayTrigger>
           :
           <td className="name px-1" onClick={() => setShowModal(card.c)}>
             <ResultLibraryName card={card.c}/>
           </td>
          }
          <td className="cost px-1" onClick={() => setShowModal(card.c)}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="discipline px-1" onClick={() => setShowModal(card.c)}>
            {DisciplineOrClan}
          </td>
          <td className="burn px-1" onClick={() => setShowModal(card.c)}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle value={card.c['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-library-table">
        <tbody>{cardLines}</tbody>
      </table>
      {showModal && (
        <ResultLibraryModal
          show={showModal ? true : false}
          card={showModal}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setShowModal(false)}
          isMobile={props.isMobile}
        />
      )}
    </>
  );
}

export default InventoryLibraryTable;
