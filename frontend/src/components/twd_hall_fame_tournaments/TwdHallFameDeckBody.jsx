import React from 'react';
import {
  TwdResultDescription,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
} from '@/components';

const TwdHallFameDeckBody = ({ deck, isMobile }) => {
  return (
    <div className="flex flex-row">
      <div
        className={`
           basis-full md:basis-full xl:basis-1/4
             ${isMobile ? '' : ''}`}
      >
        <TwdResultDescription deck={deck} />
      </div>
      {isMobile ? (
        <>
          <div className="basis-1/2">
            <TwdResultCryptTable crypt={deck.crypt} />
          </div>
          <div className="basis-1/2">
            <TwdResultLibraryKeyCardsTable library={deck.library} />
          </div>
        </>
      ) : (
        <>
          <div className="basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultCryptTable crypt={deck.crypt} />
          </div>
          <div className="basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultLibraryByTypeTable library={deck.library} />
          </div>
          <div className="basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultLibraryKeyCardsTable library={deck.library} />
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckBody;
