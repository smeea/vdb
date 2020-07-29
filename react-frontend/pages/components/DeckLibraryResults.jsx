import React from "react";

import DeckLibraryBurn from './DeckLibraryBurn.jsx';
import DeckLibraryClan from './DeckLibraryClan.jsx';
import DeckLibraryCost from './DeckLibraryCost.jsx';
import DeckLibraryDiscipline from './DeckLibraryDiscipline.jsx';
import DeckLibraryName from './DeckLibraryName.jsx';
import DeckLibraryQuantity from './DeckLibraryQuantity.jsx';
import DeckLibraryType from './DeckLibraryType.jsx';

function DeckLibraryBody(props) {
  let resultTrClass='library-result-even';
  const cards = props.cards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }
    if (card[0]['Clan']) {
      return (
        <tr className={resultTrClass} key={index}>
          <DeckLibraryQuantity cardid={card[0].Id} q={card[1]} deckid={props.deckid} deckCardChange={props.deckCardChange} />
          <DeckLibraryName value={card[0]['Name']} />
          <DeckLibraryCost valueBlood={card[0]['Blood Cost']} valuePool={card[0]['Pool Cost']} />
          <DeckLibraryClan value={card[0]['Clan']} />
          <DeckLibraryBurn value={card[0]['Burn Option']} />
        </tr>
      );
    } else {
      return (
        <tr className={resultTrClass} key={index}>
          <DeckLibraryQuantity cardid={card[0].Id} q={card[1]} deckid={props.deckid} deckCardChange={props.deckCardChange} />
          <DeckLibraryName value={card[0]['Name']} />
          <DeckLibraryCost valueBlood={card[0]['Blood Cost']} valuePool={card[0]['Pool Cost']} />
          <DeckLibraryDiscipline value={card[0]['Discipline']} />
          <DeckLibraryBurn value={card[0]['Burn Option']} />
        </tr>
      );
    }
  });

  return <tbody>{cards}</tbody>;
}

function DeckLibraryByTypeTable(props) {
  return (
    <div>
      <DeckLibraryType cardtype={props.cardtype} total={props.total}/>
      <table className='library-result-table'>
        <DeckLibraryBody deckid={props.deckid} deckCardChange={props.deckCardChange} cards={props.cards} />
      </table>
    </div>
  );
}

function DeckLibraryResults(props) {

  const library = {};
  const library_side = {};

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      library[card] = props.cards[card];
    } else {
      library_side[card] = props.cards[card];
    }
  });

  const cardtype_sorted = [
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

  const LibraryDeck = [];
  const LibrarySideDeck = [];
  let library_total = 0;

  for (const card in library) {
    library_total += library[card].q;
    const cardtype = library[card].c['Type'];
    if (library[cardtype] === undefined) {
      library[cardtype] = [];
    }
    library[cardtype].push([library[card].c, library[card].q]);
  }

  for (const card in library_side) {
    const cardtype = library_side[card].c['Type'];
    if (library_side[cardtype] === undefined) {
      library_side[cardtype] = [];
    }
    library_side[cardtype].push([library_side[card].c, library_side[card].q]);
  }

  for (const cardtype of cardtype_sorted) {
    if (library[cardtype] !== undefined) {
      let total = 0;
      for (const card of library[cardtype]) {
        total += card[1];
      }
      LibraryDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable deckCardChange={props.deckCardChange} deckid={props.deckid} cards={library[cardtype]} cardtype={cardtype} total={total} />
          <br />
        </div>
      );
    }

    if (library_side[cardtype] !== undefined) {
      let total = 0;
      for (const card of library_side[cardtype]) {
        total += card[1];
      }
      LibrarySideDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable deckCardChange={props.deckCardChange} deckid={props.deckid} cards={library_side[cardtype]} cardtype={cardtype} total={total} />
          <br />
        </div>
      );
    }
  }

  return (
    <div>
      <div className='deck-library'>
        <b>Library [{library_total}]:</b>
        {LibraryDeck}
      </div>
      { Object.keys(library_side).length > 0 &&
      <div className='deck-sidelibrary'>
        <b>Side Library:</b>
        {LibrarySideDeck}
      </div>
    }
    </div>
  );
}

export default DeckLibraryResults;
