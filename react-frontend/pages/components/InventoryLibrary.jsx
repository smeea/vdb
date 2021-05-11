import React, { useContext } from 'react';
import InventoryLibraryTable from './InventoryLibraryTable.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryLibrary(props) {
  const { usedLibraryCards, libraryCardBase } = useContext(AppContext);
  let library = {};

  if (props.category == 'nok') {
    Object.keys(props.cards).map((card) => {
      let softUsedMax = 0;
      if (usedLibraryCards.soft[card]) {
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedLibraryCards.hard[card]) {
        Object.keys(usedLibraryCards.hard[card]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card][id];
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
    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!props.cards[card]) {
        library[card] = { q: 0, c: libraryCardBase[card] };
      }
    });

    Object.keys(usedLibraryCards.hard).map((card) => {
      if (!props.cards[card]) {
        library[card] = { q: 0, c: libraryCardBase[card] };
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
  const unique = Object.keys(props.cards).length;
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
          <b>
            Library{' '}
            {props.category != 'nok' && (
              <>
                - {total} total, {unique} unique
              </>
            )}
          </b>
        </div>
      )}
      {LibraryDeck}
    </>
  );
}

export default InventoryLibrary;
