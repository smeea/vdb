import React, { useState } from 'react';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultAddCard from './ResultAddCard.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

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

    const [showModal, setShowModal] = useState(undefined);

    return (
      <React.Fragment key={index}>
        <tr
          className={resultTrClass}
          onClick={() => setShowModal(true)}
        >
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
              setShowImage={props.setShowImage}
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
        {props.isMobile && showModal &&
         <ResultCryptModal
           show={showModal}
           card={card}
           showImage={props.showImage}
           setShowImage={props.setShowImage}
           handleClose={() => setShowModal(false)}
         />
        }
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
