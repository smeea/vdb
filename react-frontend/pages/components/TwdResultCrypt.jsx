import React from 'react';
import ResultCryptName from './ResultCryptName.jsx';

function TwdResultCrypt({ crypt, isMobile, showImage, setShowImage}) {
  let resultTrClass = 'library-result-even';

  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(crypt).map((card, index) => {
    if (crypt[card].c['Group'] == 'ANY') {
      return;
    }
    if (
      crypt[card].c['Group'] < cryptGroupMin ||
        cryptGroupMin == undefined
    ) {
      cryptGroupMin = crypt[card].c['Group'];
    }
    if (
      cryptGroupMax == undefined
    ) {
      cryptGroupMax = crypt[card].c['Group'];
    }
  });


  let cryptTotal = 0;
  for (const card in crypt) {
    if (card) {
      cryptTotal += crypt[card].q;
    }
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const SortByQuantity = (a, b) => {
    if (a.q > b.q) return -1;
    else return 1;
  };

  const SortByCapacity = (a, b) => {
    if (a.c['Capacity'] > b.c['Capacity']) return 1;
    else return -1;
  };

  const sortedCards = Object.values(crypt)
        .sort(SortByCapacity)
        .sort(SortByQuantity)

  const cardLines = sortedCards.map((card, index) => {

    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <tr key={index} className={resultTrClass}>
        <td className="quantity-no-buttons px-2">{card.q}</td>
        <td className="name"
            /* onClick={() => setShowModal(card.c)} */
        >
          <div className="px-1">
            <ResultCryptName
              card={card.c}
              showImage={showImage}
              setShowImage={setShowImage}
              isMobile={isMobile}
            />
      </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      <div>
        <b>Crypt [{cryptTotal}] - {cryptGroups}</b>
      </div>
      <table width="100%">
        <tbody>
          {cardLines}
        </tbody>
      </table>
    </>
  );
}

export default TwdResultCrypt;
