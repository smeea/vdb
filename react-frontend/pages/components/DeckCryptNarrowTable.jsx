import React from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';

function DeckCryptNarrowTable(props) {
  let resultTrClass;

  const cardRows = props.resultCards.map((card, index) => {
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
              card={card.c}
            />
          </td>
          <td className="clan" onClick={() => setmodalCard(card)}>
            <ResultCryptClan value={card.c['Clan']} />
          </td>
          <td className="group" onClick={() => setmodalCard(card)}>
            <ResultCryptGroup value={card.c['Group']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });
  return (
    <table className={props.className}>
      <tbody>{cardRows}</tbody>
    </table>
  );
}
export default DeckCryptNarrowTable;
