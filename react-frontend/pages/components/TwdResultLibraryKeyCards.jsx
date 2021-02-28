import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultLibraryPopover from './ResultLibraryPopover.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';

function TwdResultLibraryKeyCards(props) {
  const [modalCard, setModalCard] = useState(undefined);

  const cardtypeSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  let libraryTotal = 0;
  const libraryByType = {};

  Object.keys(props.library).map((card) => {
    libraryTotal += props.library[card].q;
    const cardtype = props.library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }

    libraryByType[cardtype].push(props.library[card]);
  });

  const keyCards = [];

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByType[cardtype]
        .filter((card) => {
          return card.q >= 4;
        })
        .map((card) => {
          keyCards.push(card);
        });
    }
  }

  let resultTrClass = 'result-even';

  const cardLines = keyCards.map((card, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
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
      <tr key={index} className={resultTrClass}>
        <td className="quantity-no-buttons px-1">{card.q}</td>
        <td className="type" onClick={() => handleClick()}>
          <ResultLibraryType cardtype={card.c['Type']} />
        </td>
        {!props.isMobile ?
         <OverlayTrigger
           placement={props.placement ? props.placement : 'right'}
           overlay={
             <CardPopover card={card.c}>{props.showImage}</CardPopover>
           }
         >
           <td className="name px-1" onClick={() => setModalCard(card.c)}>
             <ResultLibraryName card={card.c} />
           </td>
         </OverlayTrigger>
         :
         <td className="name px-1" onClick={() => setModalCard(card.c)}>
           <ResultLibraryName card={card.c} />
         </td>
        }
        {!props.isMobile &&
         <td className="disciplines" onClick={() => handleClick()}>
           <ResultLibraryDisciplines value={card.c['Discipline']} />
           <ResultLibraryClan value={card.c['Clan']} />
         </td>
        }
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>{props.isMobile && `Library [${libraryTotal}],`} Key Cards:</b>
      </div>
      <div className="props.library">
        <table className="twd-library-table">
          <tbody>{cardLines}</tbody>
        </table>
      </div>
      {modalCard && (
        <ResultLibraryModal
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

export default TwdResultLibraryKeyCards;
