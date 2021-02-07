import React from 'react';
import InventoryLibraryTable from './InventoryLibraryTable.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function InventoryLibrary(props) {
  const library = {};

  Object.keys(props.cards).map((card, index) => {
    library[card] = props.cards[card];
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

  let libraryTotal = 0;
  const libraryByType = {};

  for (const card in library) {
    if (card) {
      libraryTotal += library[card].q;
      const cardtype = library[card].c['Type'];
      if (libraryByType[cardtype] === undefined) {
        libraryByType[cardtype] = [];
      }
      libraryByType[cardtype].push(library[card]);
    }
  }

  const libraryByTypeTotal = {};
  const LibraryDeck = [];

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByTypeTotal[cardtype] = 0;
      for (const card of libraryByType[cardtype]) {
        libraryByTypeTotal[cardtype] += card.q;
      }
      LibraryDeck.push(
        <div key={cardtype} className="pt-2">
          <ResultLibraryType
            cardtype={cardtype}
            total={libraryByTypeTotal[cardtype]}
          />
          <InventoryLibraryTable
            cardChange={props.cardChange}
            decks={props.decks}
            cards={libraryByType[cardtype]}
            usedCards={props.usedCards}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
            isWide={props.isWide}
          />
        </div>
      );
    }
  }

  return (
    <div className="pt-4">
      <div className="d-flex align-items-center justify-content-between pl-2 info-message">
        <b>Library [{libraryTotal}]</b>
      </div>
      {LibraryDeck}
    </div>
  );
}

export default InventoryLibrary;
