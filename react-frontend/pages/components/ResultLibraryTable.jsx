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

  const [modalCard, setModalCard] = useState(undefined);

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
              onClick={() => setModalCard(card)}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type"
              onClick={() => setModalCard(card)}
          >
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className="disciplines"
              onClick={() => setModalCard(card)}
          >
            <ResultLibraryDisciplines value={card['Discipline']} />
          </td>
          <td className="name"
              onClick={() => setModalCard(card)}
          >
            <ResultLibraryName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          <td className="clan"
              onClick={() => setModalCard(card)}
          >
            <ResultLibraryClan value={card['Clan']} />
          </td>
          <td className="burn"
              onClick={() => setModalCard(card)}
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
      {props.isMobile && modalCard &&
       <ResultLibraryModal
         show={modalCard? true : false}
         card={modalCard}
         showImage={props.showImage}
         setShowImage={props.setShowImage}
         handleClose={() => setModalCard(false)}
       />
      }
    </>
  );
}

export default ResultLibraryTable;
