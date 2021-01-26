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

function DeckLibraryTable(props) {
  let resultTrClass = 'result-even';

  const [showModal, setShowModal] = useState(undefined);

  const cardLines = props.cards.map((card, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
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

    return (
      <React.Fragment key={index}>
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
            <td className="quantity pr-1">
              <DeckCardQuantity
                cardid={card.c['Id']}
                q={card.q}
                deckid={props.deckid}
                deckCardChange={props.deckCardChange}
                isMobile={props.isMobile}
              />
            </td>
          ) : props.proxySelected ? (
            <td className="quantity pr-1">
              <DeckCardQuantity
                cardid={card.c['Id']}
                deckid={null}
                q={
                  props.proxySelected[card.c['Id']]
                    ? props.proxySelected[card.c['Id']].q
                    : 0
                }
                deckCardChange={props.proxyCounter}
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

export default DeckLibraryTable;
