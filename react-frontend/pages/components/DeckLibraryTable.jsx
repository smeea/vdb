import React, { useState } from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';

function DeckLibraryTable(props) {
  let resultTrClass = 'library-result-even';

  const [showModal, setShowModal] = useState(undefined);

  const cardLines = props.cards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.isAuthor ? (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c['Id']}
                q={card.q}
                deckid={props.deckid}
                deckCardChange={props.deckCardChange}
              />
            </td>
          ) : card.q ? (
            <td className="quantity-no-buttons px-2">{card.q}</td>
          ) : (
            <td className="quantity-no-buttons px-2">
              <div className="transparent">0</div>
            </td>
          )}
          <td className="name" onClick={() => setShowModal(card.c)}>
            <div className="px-2">
              <ResultLibraryName
                showImage={props.showImage}
                setShowImage={props.setShowImage}
                id={card.c['Id']}
                value={card.c['Name']}
                ban={card.c['Banned']}
                card={card.c}
                isMobile={props.isMobile}
              />
            </div>
          </td>
          <td className="cost" onClick={() => setShowModal(card.c)}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="discipline" onClick={() => setShowModal(card.c)}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => setShowModal(card.c)}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle value={card.c['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-library-table">
        <tbody>{cardLines}</tbody>
      </table>
      {props.isMobile && showModal && (
        <ResultLibraryModal
          show={showModal ? true : false}
          card={showModal}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default DeckLibraryTable;
