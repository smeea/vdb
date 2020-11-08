import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChevronExpand from '../../assets/images/icons/chevron-expand.svg';
import DeckShowLibraryTable from './DeckShowLibraryTable.jsx';
import DeckShowLibraryTotalByTypes from './DeckShowLibraryTotalByTypes.jsx';
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
  const [showTotal, setShowTotal] = useState(false);

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

  const libraryByType = {};

  for (const card in library) {
    if (card) {
      libraryTotal += library[card].q;
      const cardtype = library[card].c['Type'];
      if (libraryByType[cardtype] === undefined) {
        libraryByType[cardtype] = [];
      }
      libraryByType[cardtype].push([library[card].c, library[card].q]);
    }
  }

  const librarySideByType = {};

  for (const card in librarySide) {
    if (card) {
      const cardtype = librarySide[card].c['Type'];
      if (librarySideByType[cardtype] === undefined) {
        librarySideByType[cardtype] = [];
      }
      librarySideByType[cardtype].push([librarySide[card].c, librarySide[card].q]);
    }
  }

  const libraryByTypeTotal = {}

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByTypeTotal[cardtype] = 0;
      let total = 0;
      for (const card of libraryByType[cardtype]) {
        total += card[1];
        libraryByTypeTotal[cardtype] += card[1];
      }
      LibraryDeck.push(
        <div key={cardtype} className="pt-2">
          <DeckLibraryByTypeTable
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={libraryByType[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
          />
        </div>
      );
    }

    if (librarySideByType[cardtype] !== undefined) {
      let total = 0;
      for (const card of librarySideByType[cardtype]) {
        total += card[1];
      }
      LibrarySideDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={librarySideByType[cardtype]}
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
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => setShowTotal(!showTotal)}
          >
            <ChevronExpand />
          </Button>
          {props.isAuthor && (
            <Button
              variant="outline-secondary"
              onClick={() => setShowAdd(!showAdd)}
            >
              +
            </Button>
          )}
        </div>
      </div>
      {showTotal &&
       <div className="d-flex align-items-center justify-content-between pl-2 info-message">
         <DeckShowLibraryTotalByTypes
           byTypes={libraryByTypeTotal}
         />
       </div>
      }
      {showAdd && <DeckNewLibraryCard deckCardAdd={props.deckCardAdd} />}
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
    </div>
  );
}

export default DeckShowLibrary;
