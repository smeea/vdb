import React, { useState } from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';

function DeckShowLibraryTable(props) {
  let resultTrClass = 'library-result-even';

  const [showModal, setShowModal] = useState(undefined);

  const cardLines = props.cards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    let DisciplineOrClan;
    if (card[0]['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card[0]['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card[0]['Discipline']} />
      );
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.isAuthor
           ? <td className="quantity">
               <DeckCardQuantity
                 cardid={card[0].Id}
                 q={card[1]}
                 deckid={props.deckid}
                 deckCardChange={props.deckCardChange}
               />
             </td>
           : card[1]
           ? <td className="quantity-no-buttons px-3">
               {card[1]}
             </td>
           : <td className="quantity-no-buttons" />
          }
          <td className="name"
              onClick={() => setShowModal(card[0])}
          >
            <div className="px-2">
              <ResultLibraryName
                showImage={props.showImage}
                setShowImage={props.setShowImage}
                id={card[0]['Id']}
                value={card[0]['Name']}
                ban={card[0]['Banned']}
                card={card[0]}
                isMobile={props.isMobile}
              />
            </div>
          </td>
          <td className="cost"
              onClick={() => setShowModal(card[0])}
          >
            <ResultLibraryCost
              valueBlood={card[0]['Blood Cost']}
              valuePool={card[0]['Pool Cost']}
            />
          </td>
          <td className="discipline"
              onClick={() => setShowModal(card[0])}
          >
            {DisciplineOrClan}
          </td>
          <td className="burn"
              onClick={() => setShowModal(card[0])}
          >
            <ResultLibraryBurn value={card[0]['Burn Option']} />
            <ResultLibraryTrifle value={card[0]['Card Text']} />
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
      {props.isMobile && showModal &&
       <ResultLibraryModal
         show={showModal? true : false}
         card={showModal}
         showImage={props.showImage}
         setShowImage={props.setShowImage}
         handleClose={() => setShowModal(false)}
       />
      }
    </>
  );
}

export default DeckShowLibraryTable;
