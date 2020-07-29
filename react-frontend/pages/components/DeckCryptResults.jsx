import React from "react";

import DeckCryptCapacity from './DeckCryptCapacity.jsx';
import DeckCryptDisciplines from './DeckCryptDisciplines.jsx';
import DeckCryptName from './DeckCryptName.jsx';
import DeckCryptClan from './DeckCryptClan.jsx';
import DeckCryptGroup from './DeckCryptGroup.jsx';
import DeckCryptQuantity from './DeckCryptQuantity.jsx';

function DeckCryptSideBody(props) {
  const disciplines_set = props.disciplines_set;

  const SortByCapacity = (a, b) => {
    if (a.c['Capacity'] > b.c['Capacity']) {
      return -1;
    } else {
      return 1;
    }
  };

  const sorted_cards = Object.values(props.cards).sort(SortByCapacity);

  let resultTrClass;
  const cards = sorted_cards.map((card, index) => {

    if (resultTrClass == 'crypt-result-odd') {
      resultTrClass = 'crypt-result-even';
    } else {
      resultTrClass = 'crypt-result-odd';
    }

    return (
      <tr className={resultTrClass} key={index}>
        <DeckCryptQuantity cardid={card.c['Id']} q={card.q} deckid={props.deckid} deckCardChange={props.deckCardChange} />
        <DeckCryptCapacity value={card.c['Capacity']} />
        <DeckCryptDisciplines disciplines_set={disciplines_set} value={card.c['Disciplines']} />
        <DeckCryptName value={card.c['Name']} />
        <DeckCryptClan value={card.c['Clan']} />
        <DeckCryptGroup value={card.c['Group']} />
      </tr>
    );
  });
  return <tbody>{cards}</tbody>;
}

function DeckCryptBody(props) {
  const disciplines_set = props.disciplines_set;

  const SortByQuantity = (a, b) => {
    if (a.q > b.q) {
      return -1;
    } else {
      return 1;
    }
  };

  const sorted_cards = Object.values(props.cards).sort(SortByQuantity);

  let resultTrClass;
  const cards = sorted_cards.map((card, index) => {

    if (resultTrClass == 'crypt-result-odd') {
      resultTrClass = 'crypt-result-even';
    } else {
      resultTrClass = 'crypt-result-odd';
    }

    return (
      <tr className={resultTrClass} key={index}>
        <DeckCryptQuantity cardid={card.c['Id']} q={card.q} deckid={props.deckid} deckCardChange={props.deckCardChange} />
        <DeckCryptCapacity value={card.c['Capacity']} />
        <DeckCryptDisciplines disciplines_set={disciplines_set} value={card.c['Disciplines']} />
        <DeckCryptName value={card.c['Name']} />
        <DeckCryptClan value={card.c['Clan']} />
        <DeckCryptGroup value={card.c['Group']} />
      </tr>
    );
  });
  return <tbody>{cards}</tbody>;
}

function DeckCryptResults(props) {

  let d_set = new Set();
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      d_set.add(d);
    };
  };
  const disciplines_set = [...d_set].sort();

  const crypt = {};
  const crypt_side = {};
  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      crypt[card] = props.cards[card];
    } else {
      crypt_side[card] = props.cards[card];
    }
  });

  let crypt_total = 0;
  for (const card in crypt) {
    crypt_total += crypt[card].q;
  }

  return (
    <div>
      <div className='deck-crypt'>
        <b>Crypt [{crypt_total}]:</b>
        <table className="crypt-result-table">
          <DeckCryptBody deckid={props.deckid} deckCardChange={props.deckCardChange} cards={crypt} disciplines_set={disciplines_set} />
        </table>
      </div>
      { Object.keys(crypt_side).length > 0 &&
        <div className='deck-sidecrypt'>
          <br />
          <b>Side Crypt</b>
          <table className="crypt-result-table">
            <DeckCryptSideBody deckid={props.deckid} deckCardChange={props.deckCardChange} cards={crypt_side} disciplines_set={disciplines_set}/>
          </table>
        </div>
      }
    </div>
  );
}

export default DeckCryptResults;
