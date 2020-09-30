import React from 'react';

import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptName from './ResultCryptName.jsx';

function DeckCryptSideBody(props) {
  const SortByCapacity = (a, b) => {
    if (a.c['Capacity'] > b.c['Capacity']) {
      return -1;
    } else {
      return 1;
    }
  };
  const sortedCards = Object.values(props.cards).sort(SortByCapacity);

  let resultTrClass;

  const cards = sortedCards.map((card, index) => {
    if (resultTrClass == 'crypt-result-odd') {
      resultTrClass = 'crypt-result-even';
    } else {
      resultTrClass = 'crypt-result-odd';
    }

    return (
      <tr key={index} className={resultTrClass}>
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
            toggleImage={props.toggleImage}
            id={card.c['Id']}
            value={card.c['Name']}
            adv={card.c['Adv']}
            ban={card.c['Banned']}
            card={card.c}
          />
        </td>
      </tr>
    );
  });
  return <tbody>{cards}</tbody>;
}

function DeckCryptBody(props) {
  const SortByQuantity = (a, b) => {
    if (a.q > b.q) {
      return -1;
    } else {
      return 1;
    }
  };

  const sortedCards = Object.values(props.cards).sort(SortByQuantity);
  let resultTrClass;

  const cards = sortedCards.map((card, index) => {
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
              toggleImage={props.toggleImage}
              id={card.c['Id']}
              value={card.c['Name']}
              adv={card.c['Adv']}
              ban={card.c['Banned']}
              card={card.c}
            />
          </td>
        </tr>
      </React.Fragment>
    );
  });
  return <tbody>{cards}</tbody>;
}

function DeckPreviewCrypt(props) {
  const dSet = new Set();
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      dSet.add(d);
    }
  }
  const disciplinesSet = [...dSet].sort();

  const crypt = {};
  const cryptSide = {};

  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      crypt[card] = props.cards[card];
    } else {
      cryptSide[card] = props.cards[card];
    }

    if (
      props.cards[card].c['Group'] < cryptGroupMin ||
      cryptGroupMin == undefined
    ) {
      cryptGroupMin = props.cards[card].c['Group'];
    }
    if (
      props.cards[card].c['Group'] > cryptGroupMax ||
      cryptGroupMax == undefined
    ) {
      cryptGroupMax = props.cards[card].c['Group'];
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

  return (
    <>
      <div className="deck-crypt">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
        </b>
        <table className="deck-crypt-table">
          <DeckCryptBody
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            deckid={props.deckid}
            deckCardChange={props.deckCardChange}
            cards={crypt}
            disciplinesSet={disciplinesSet}
          />
        </table>
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt">
          <b>Side Crypt</b>
          <table className="deck-crypt-table">
            <DeckCryptSideBody
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deckid={props.deckid}
              deckCardChange={props.deckCardChange}
              cards={cryptSide}
              disciplinesSet={disciplinesSet}
            />
          </table>
        </div>
      )}
    </>
  );
}

export default DeckPreviewCrypt;
