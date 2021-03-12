import React from 'react';
import InventoryLibraryTable from './InventoryLibraryTable.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function InventoryLibrary(props) {
  let library = {};

  if (props.category == 'nok') {
    Object.keys(props.cards).map((card) => {
      let softUsedMax = 0;
      if (props.usedCards.soft[card]) {
        Object.keys(props.usedCards.soft[card]).map((id) => {
          if (softUsedMax < props.usedCards.soft[card][id]) {
            softUsedMax = props.usedCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (props.usedCards.hard[card]) {
        Object.keys(props.usedCards.hard[card]).map((id) => {
          hardUsedTotal += props.usedCards.hard[card][id];
        });
      }

      if (props.cards[card].q < softUsedMax + hardUsedTotal) {
        library[card] = props.cards[card];
      }
    });
  } else {
    library = { ...props.cards };
  }

  if (!props.compact && props.category != 'ok') {
    Object.keys(props.usedCards.soft).map((card) => {
      if (!props.cards[card]) {
        library[card] = { q: 0, c: props.cardBase[card] };
      }
    });

    Object.keys(props.usedCards.hard).map((card) => {
      if (!props.cards[card]) {
        library[card] = { q: 0, c: props.cardBase[card] };
      }
    });
  }

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

  let total = 0;
  const libraryByType = {};

  for (const card in library) {
    if (props.category != 'ok' || library[card].q > 0) {
      total += library[card].q;
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
        <div key={cardtype} className={props.compact ? null : 'pt-2'}>
          {!props.compact && (
            <ResultLibraryType
              cardtype={cardtype}
              total={libraryByTypeTotal[cardtype]}
            />
          )}
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
            showFloatingButtons={props.showFloatingButtons}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }
  }

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between pl-2 info-message">
          <b>Library {props.category != 'nok' && <>[{total}]</>}</b>
        </div>
      )}
      {LibraryDeck}
    </>
  );
}

export default InventoryLibrary;
