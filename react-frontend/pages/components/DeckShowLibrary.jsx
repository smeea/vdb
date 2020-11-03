import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DeckShowLibraryTable from './DeckShowLibraryTable.jsx';
import DeckNewLibraryCard from './DeckNewLibraryCard.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function DeckLibraryByTypeTable(props) {
  return (
    <>
      <ResultLibraryType
        cardtype={props.cardtype}
        total={props.total}
      />
      <DeckShowLibraryTable
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        toggleImage={props.toggleImage}
        deckid={props.deckid}
        deckCardChange={props.deckCardChange}
        cards={props.cards}
        isAuthor={props.isAuthor}
        isMobile={props.isMobile}
      />
    </>
  );
}

function DeckShowLibrary(props) {
  const [showAdd, setShowAdd] = useState(false);

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
            setShowImage={props.setShowImage}
            toggleImage={props.toggleImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={library[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
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
            setShowImage={props.setShowImage}
            toggleImage={props.toggleImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={librarySide[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
          />
        </div>
      );
    }
  }

  return (
    <div className="pt-4">
      <div className="d-flex align-items-center justify-content-between pl-2 info-message">
        <b>Library [{libraryTotal}]</b>
        {props.isAuthor && (
          <Button
            variant="outline-secondary"
            onClick={() => setShowAdd(!showAdd)}
          >
            +
          </Button>
        )}
      </div>
      {showAdd && <DeckNewLibraryCard deckCardAdd={props.deckCardAdd} />}
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="deck-sidelibrary pt-1">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
    </div>
  );
}

export default DeckShowLibrary;
