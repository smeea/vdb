import React from 'react';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultAddCard from './ResultAddCard.jsx';

function ResultCryptTable(props) {
  let resultTrClass = 'crypt-result-even';

  const cards = props.resultCards.map((card, index) => {
    if (resultTrClass == 'crypt-result-even') {
      resultTrClass = 'crypt-result-odd';
    } else {
      resultTrClass = 'crypt-result-even';
    }

    let inDeck;
    if (props.crypt) {
      Object.keys(props.crypt).map((i, index) => {
        if (i == card.Id) {
          inDeck = props.crypt[i].q;
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
          <td className="capacity">
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines">
            <ResultCryptDisciplines value={card['Disciplines']} />
          </td>
          <td className="name">
            <ResultCryptName
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              id={card['Id']}
              value={card['Name']}
              adv={card['Adv']}
              ban={card['Banned']}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          <td className="clan">
            <ResultCryptClan value={card['Clan']} />
          </td>
          <td className="group">
            <ResultCryptGroup value={card['Group']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <table className="search-crypt-table">
      <tbody>{cards}</tbody>
    </table>
  );
}

export default ResultCryptTable;
