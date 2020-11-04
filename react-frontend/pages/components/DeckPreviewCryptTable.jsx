import React from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptName from './ResultCryptName.jsx';

function DeckPreviewCryptTable(props) {
  let resultTrClass;

  const cardLines = props.cards.map((card, index) => {
    if (resultTrClass == 'crypt-result-odd') {
      resultTrClass = 'crypt-result-even';
    } else {
      resultTrClass = 'crypt-result-odd';
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="quantity">
            <DeckCardQuantity
              cardid={card.c['Id']}
              q={card.q}
              deckid={props.deckid}
              deckCardChange={props.deckCardChange}
            />
          </td>
          <td className="name">
            <ResultCryptName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              id={card.c['Id']}
              value={card.c['Name']}
              adv={card.c['Adv']}
              ban={card.c['Banned']}
              card={card.c}
            />
          </td>
        </tr>
      </React.Fragment>
    );
  });
  return (
    <table className="deck-crypt-table">
      <tbody>{cardLines}</tbody>
    </table>
  );
}
export default DeckPreviewCryptTable;
