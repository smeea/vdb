import React, { useState } from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function DeckShowCryptTable(props) {
  let resultTrClass;

  const [showModal, setShowModal] = useState(undefined);

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
          <td className="capacity"
              onClick={() => setShowModal(card.c)}
          >
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          <td className="disciplines"
              onClick={() => setShowModal(card.c)}
          >
            <ResultCryptDisciplines
              disciplinesSet={props.disciplinesSet}
              value={card.c['Disciplines']}
            />
          </td>
          <td className="name"
              onClick={() => setShowModal(card.c)}
          >
            <ResultCryptName
              id={card.c['Id']}
              value={card.c['Name']}
              adv={card.c['Adv']}
              ban={card.c['Banned']}
              card={card.c}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isMobile={props.isMobile}
            />
          </td>
          <td className="clan"
              onClick={() => setShowModal(card.c)}
          >
            <ResultCryptClan value={card.c['Clan']} />
          </td>
          <td className="group"
              onClick={() => setShowModal(card.c)}
          >
            <ResultCryptGroup value={card.c['Group']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });
  return (
    <>
      <table className="deck-crypt-table">
        <tbody>{cardLines}</tbody>
      </table>
      {props.isMobile && showModal &&
       <ResultCryptModal
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
export default DeckShowCryptTable;
