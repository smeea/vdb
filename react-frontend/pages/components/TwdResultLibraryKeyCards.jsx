import React, { useState } from 'react';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';

function TwdResultLibraryKeyCards({
  library,
  isMobile,
  showImage,
  setShowImage,
}) {

  const [modalCard, setModalCard] = useState(undefined);

  const cardtypeSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  const libraryByType = {};

  Object.keys(library).map((card) => {
    const cardtype = library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }

    libraryByType[cardtype].push(library[card]);
  });

  const keyCards = [];

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByType[cardtype]
        .filter((card) => {
          return card.q >= 4;
        })
        .map((card) => {
          keyCards.push(card);
        });
    }
  }

  let resultTrClass = 'library-result-even';

  const cardLines = keyCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <tr key={index} className={resultTrClass}>
        <td className="quantity-no-buttons px-2">{card.q}</td>
        <td
          className="name"
          onClick={() => setModalCard(card.c)}
        >
          <div className="px-1">
            <ResultLibraryName
              card={card.c}
              showImage={showImage}
              setShowImage={setShowImage}
              isMobile={isMobile}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>Key Cards (4+ pcs):</b>
      </div>
      <div className="library">
        <table width="100%">
          <tbody>{cardLines}</tbody>
        </table>
      </div>
      {isMobile && modalCard && (
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={showImage}
          setShowImage={setShowImage}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdResultLibraryKeyCards;
