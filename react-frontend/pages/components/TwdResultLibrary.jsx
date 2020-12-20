import React from 'react';
import TwdResultLibraryByType from './TwdResultLibraryByType.jsx';
import TwdResultLibraryKeyCards from './TwdResultLibraryKeyCards.jsx';

function TwdResultLibrary({ library, isMobile, showImage, setShowImage}) {

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

  Object.keys(library).map(card => {
      libraryTotal += library[card].q;
      const cardtype = library[card].c['Type'];
      if (libraryByType[cardtype] === undefined) {
        libraryByType[cardtype] = [];
      }

      libraryByType[cardtype].push(library[card]);
    })

  const LibraryTypes = []
  const keyCards = []

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      LibraryTypes.push(
        <div key={cardtype} className="pt-2">
          <TwdResultLibraryByType
            showImage={showImage}
            setShowImage={setShowImage}
            cards={libraryByType[cardtype]}
            cardtype={cardtype}
            isMobile={isMobile}
            isAuthor={false}
          />
        </div>
      );

      libraryByType[cardtype]
        .filter(card => {return card.q >= 4})
        .map(card => {
        keyCards.push(card)
      })
    }
  }

  return (
    <>
      <div>
        <b>Library [{libraryTotal}]:</b>
        {LibraryTypes}
      </div>
      <div>
        <b>Library Key Cards (4+ pcs):</b>
        <TwdResultLibraryKeyCards
          showImage={showImage}
          setShowImage={setShowImage}
          cards={keyCards}
          isMobile={isMobile}
        />
      </div>
    </>
  );
}

export default TwdResultLibrary;
