import React, { useState } from 'react';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultAddCard from './ResultAddCard.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';

function ResultLibraryTable(props) {
  let resultTrClass;

  const [showModal, setShowModal] = useState(undefined);

  const cardRows = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    let inDeck;
    if (props.library) {
      Object.keys(props.library).map((i, index) => {
        if (i == card.Id) {
          inDeck = props.library[i].q;
        }
      });
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.addMode && (
            <td className="quantity">
              <ResultAddCard
                deckCardAdd={props.deckCardAdd}
                cardid={card['Id']}
                inDeck={inDeck}
              />
            </td>
          )}
          <td className="cost py-0"
              onClick={() => setShowModal(true)}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type"
              onClick={() => setShowModal(true)}
          >
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className="disciplines"
              onClick={() => setShowModal(true)}
          >
            <ResultLibraryDisciplines value={card['Discipline']} />
          </td>
          <td className="name"
              onClick={() => setShowModal(true)}
          >
            <ResultLibraryName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              id={card['Id']}
              value={card['Name']}
              ban={card['Banned']}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          <td className="clan"
              onClick={() => setShowModal(true)}
          >
            <ResultLibraryClan value={card['Clan']} />
          </td>
          <td className="burn"
              onClick={() => setShowModal(true)}
          >
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

export default ResultLibraryTable;
