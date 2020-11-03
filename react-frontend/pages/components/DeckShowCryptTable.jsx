import React from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';

function DeckShowCryptTable(props) {
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
            {props.isAuthor ? (
              <DeckCardQuantity
                cardid={card.c['Id']}
                q={card.q}
                deckid={props.deckid}
                deckCardChange={props.deckCardChange}
              />
            ) : card.q ? (
              card.q
            ) : null}
          </td>
          <td className="capacity">
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          <td className="disciplines">
            <ResultCryptDisciplines
              disciplinesSet={props.disciplinesSet}
              value={card.c['Disciplines']}
            />
          </td>
          <td className="name">
            <ResultCryptName
              id={card.c['Id']}
              value={card.c['Name']}
              adv={card.c['Adv']}
              ban={card.c['Banned']}
              card={card.c}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              toggleImage={props.toggleImage}
              isMobile={props.isMobile}
            />
          </td>
          <td className="clan">
            <ResultCryptClan value={card.c['Clan']} />
          </td>
          <td className="group">
            <ResultCryptGroup value={card.c['Group']} />
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
export default DeckShowCryptTable;
