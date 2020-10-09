import React from 'react';

import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';

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
              toggleImage={props.toggleImage}
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

  const SortByCapacity = (a, b) => {
    if (a.c['Capacity'] > b.c['Capacity']) {
      return 1;
    } else {
      return -1;
    }
  };

  const sortedCards = Object.values(props.cards).sort(SortByCapacity).sort(SortByQuantity);

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
              toggleImage={props.toggleImage}
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
  return <tbody>{cards}</tbody>;
}

function DeckShowCrypt(props) {
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
            deckid={props.deckid}
            deckCardChange={props.deckCardChange}
            cards={crypt}
            disciplinesSet={disciplinesSet}
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            isAuthor={props.isAuthor}
          />
        </table>
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt">
          <b>Side Crypt</b>
          <table className="deck-crypt-table">
            <DeckCryptSideBody
              deckid={props.deckid}
              deckCardChange={props.deckCardChange}
              cards={cryptSide}
              disciplinesSet={disciplinesSet}
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              isAuthor={props.isAuthor}
            />
          </table>
        </div>
      )}
    </>
  );
}

export default DeckShowCrypt;
