import React, { useState } from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultAddCard from './ResultAddCard.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function ResultCryptTable(props) {
  let resultTrClass;

  const [showModal, setShowModal] = useState(undefined);

  const cardRows = props.resultCards.map((card, index) => {
    let q;
    if (props.className == "deck-crypt-table") {
      q = card.q
      card = card.c
    }

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
          {props.className == "deck-crypt-table"
           ? <>
               {props.isAuthor
                ? <td className="quantity">
                    <DeckCardQuantity
                      cardid={card['Id']}
                      q={q}
                      deckid={props.deckid}
                      deckCardChange={props.deckCardChange}
                    />
                  </td>
                : q
                ? <td className="quantity-no-buttons px-3">
                    {q}
                  </td>
                : <td className="quantity-no-buttons px-3">
                    <div className="transparent">0</div>
                  </td>
               }
             </>
           : <>
               {props.addMode && (
                 <td className="quantity" >
                   <ResultAddCard
                     deckCardAdd={props.deckCardAdd}
                     cardid={card['Id']}
                     inDeck={inDeck}
                   />
                 </td>
               )}
             </>
          }
          <td className="capacity"
              onClick={() => setShowModal(card)}
          >
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines"
              onClick={() => setShowModal(card)}
          >
            <ResultCryptDisciplines
              value={card['Disciplines']}
              disciplinesSet={props.disciplinesSet}
            />
          </td>
          <td className="name"
              onClick={() => setShowModal(card)}
          >
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
          <td className="clan"
              onClick={() => setShowModal(card)}
          >
            <ResultCryptClan value={card['Clan']} />
          </td>
          <td className="group"
              onClick={() => setShowModal(card)}
          >
            <ResultCryptGroup value={card['Group']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={props.className}>
        <tbody>{cardRows}</tbody>
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

export default ResultCryptTable;
