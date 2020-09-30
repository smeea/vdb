import React from 'react';

import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function DeckLibraryBody(props) {
  let resultTrClass = 'library-result-even';

  const cards = props.cards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    return (
      <tr key={index} className={resultTrClass}>
        <td className="quantity">
          <DeckCardQuantity
            cardid={card[0].Id}
            q={card[1]}
            deckid={props.deckid}
            deckCardChange={props.deckCardChange}
          />
        </td>
        <td className="name">
          <ResultLibraryName
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            id={card[0]['Id']}
            value={card[0]['Name']}
            ban={card[0]['Banned']}
            card={card[0]}
          />
        </td>
      </tr>
    );
  });

  return <tbody>{cards}</tbody>;
}

function DeckLibraryByTypeTable(props) {
  return (
    <>
      <ResultLibraryType cardtype={props.cardtype} total={props.total} />
      <table className="deck-library-table">
        <DeckLibraryBody
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          deckid={props.deckid}
          deckCardChange={props.deckCardChange}
          cards={props.cards}
        />
      </table>
    </>
  );
}

function DeckPreviewLibrary(props) {
  const library = {};
  const librarySide = {};

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      library[card] = props.cards[card];
    } else {
      librarySide[card] = props.cards[card];
    }
  });

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

  const LibraryDeck = [];
  const LibrarySideDeck = [];
  let libraryTotal = 0;

  for (const card in library) {
    if (card) {
      libraryTotal += library[card].q;
      const cardtype = library[card].c['Type'];
      if (library[cardtype] === undefined) {
        library[cardtype] = [];
      }
      library[cardtype].push([library[card].c, library[card].q]);
    }
  }

  for (const card in librarySide) {
    if (card) {
      const cardtype = librarySide[card].c['Type'];
      if (librarySide[cardtype] === undefined) {
        librarySide[cardtype] = [];
      }
      librarySide[cardtype].push([librarySide[card].c, librarySide[card].q]);
    }
  }

  for (const cardtype of cardtypeSorted) {
    if (library[cardtype] !== undefined) {
      let total = 0;
      for (const card of library[cardtype]) {
        total += card[1];
      }
      LibraryDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={library[cardtype]}
            cardtype={cardtype}
            total={total}
          />
        </div>
      );
    }

    if (librarySide[cardtype] !== undefined) {
      let total = 0;
      for (const card of librarySide[cardtype]) {
        total += card[1];
      }
      LibrarySideDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={librarySide[cardtype]}
            cardtype={cardtype}
            total={total}
          />
        </div>
      );
    }
  }

  return (
    <>
      <div className="deck-library">
        <b>Library [{libraryTotal}]</b>
        {LibraryDeck}
      </div>
      {Object.keys(librarySide).length > 0 && (
        <div className="deck-sidelibrary">
          <b>Side Library:</b>
          {LibrarySideDeck}
        </div>
      )}
    </>
  );
}

export default DeckPreviewLibrary;
