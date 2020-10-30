import React from 'react';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultAddCard from './ResultAddCard.jsx';

function ResultLibraryTable(props) {

  let resultTrClass = 'library-result-even';

  const cards = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }
    let inDeck;
    if (props.library) {
      Object.keys(props.library).map((i, index) => {
        if (i == card.Id) { inDeck = props.library[i].q; }
      });
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.activeDeck && props.activeDeck != 'Select Deck' && (
            <td className="quantity">
              <ResultAddCard
                deckCardAdd={props.deckCardAdd}
                cardid={card['Id']}
                inDeck={inDeck}
              />
            </td>
          )}
          <td className="cost py-0">
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type">
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className="disciplines">
            <ResultLibraryDisciplines value={card['Discipline']} />
          </td>
          <td className="name">
            <ResultLibraryName
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              id={card['Id']}
              value={card['Name']}
              ban={card['Banned']}
              card={card}
            />
          </td>
          <td className="clan">
            <ResultLibraryClan value={card['Clan']} />
          </td>
          <td className="burn">
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={card['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <table className="search-library-table">
      <tbody>{cards}</tbody>
    </table>
  );
}

export default ResultLibraryTable;
