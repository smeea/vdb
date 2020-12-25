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

  const [modalCard, setModalCard] = useState(undefined);

  const cardRows = props.resultCards.map((card, index) => {
    let q;
    if (props.className == 'deck-crypt-table') {
      q = card.q;
      card = card.c;
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
          {props.proxySelected && (
            <td className="proxy-selector">
              <div className="custom-control custom-checkbox">
                <input
                  id={card['Id']}
                  name="print"
                  className="custom-control-input"
                  type="checkbox"
                  checked={
                    props.proxySelected[card['Id']]
                      ? props.proxySelected[card['Id']].print
                      : false
                  }
                  onChange={(e) => props.proxySelector(e)}
                />
                <label htmlFor={card['Id']} className="custom-control-label" />
              </div>
            </td>
          )}
          {props.className == 'deck-crypt-table' ? (
            <>
              {props.isAuthor ? (
                <td className="quantity pr-1">
                  <DeckCardQuantity
                    cardid={card['Id']}
                    q={q}
                    deckid={props.deckid}
                    deckCardChange={props.deckCardChange}
                  />
                </td>
              ) : props.proxySelected ? (
                <td className="quantity pr-1">
                  <DeckCardQuantity
                    cardid={card['Id']}
                    deckid={null}
                    q={
                      props.proxySelected[card['Id']]
                        ? props.proxySelected[card['Id']].q
                        : 0
                    }
                    deckCardChange={props.proxyCounter}
                  />
                </td>
              ) : q ? (
                <td className="quantity-no-buttons px-2">{q}</td>
              ) : (
                <td className="quantity-no-buttons px-2">
                  <div className="transparent">0</div>
                </td>
              )}
            </>
          ) : (
            <>
              {props.addMode && (
                <td className="quantity pr-1">
                  <ResultAddCard
                    deckCardAdd={props.deckCardAdd}
                    cardid={card['Id']}
                    card={card}
                    inDeck={inDeck}
                  />
                </td>
              )}
            </>
          )}
          <td className="capacity px-1" onClick={() => setModalCard(card)}>
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines px-1" onClick={() => setModalCard(card)}>
            <ResultCryptDisciplines
              value={card['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              isMobile={props.isMobile}
            />
          </td>
          <td className="name px-1" onClick={() => setModalCard(card)}>
            <ResultCryptName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          {props.isMobile || !props.isWide ? (
            <td className="clan-group" onClick={() => setModalCard(card)}>
              <div>
                <ResultCryptClan value={card['Clan']} />
              </div>
              <div className="d-flex small justify-content-end">
                <ResultCryptGroup value={card['Group']} />
              </div>
            </td>
          ) : (
            <>
              <td className="clan px-1" onClick={() => setModalCard(card)}>
                <ResultCryptClan value={card['Clan']} />
              </td>
              <td className="group px-1" onClick={() => setModalCard(card)}>
                <ResultCryptGroup value={card['Group']} />
              </td>
            </>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={props.className}>
        <tbody>{cardRows}</tbody>
      </table>
      {props.isMobile && modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default ResultCryptTable;
