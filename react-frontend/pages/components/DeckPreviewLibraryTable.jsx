import React from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';

function DeckPreviewLibraryTable(props) {
  let resultTrClass = 'library-result-even';

  const cardLines = props.cards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="quantity">
            <DeckCardQuantity
              cardid={card[0].Id}
              q={card[1]}
              deckid={props.deckid}
              deckCardChange={props.deckCardChange}
            />
          </td>
          <td className="name">
            <ResultLibraryName
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              id={card[0]['Id']}
              value={card[0]['Name']}
              ban={card[0]['Banned']}
              card={card[0]}
            />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <table className="deck-library-table">
      <tbody>{cardLines}</tbody>
    </table>
  );
}
export default DeckPreviewLibraryTable;
