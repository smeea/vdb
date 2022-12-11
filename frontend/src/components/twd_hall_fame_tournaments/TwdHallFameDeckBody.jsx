import React from 'react';
import {
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';

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
            <TwdResultCrypt crypt={deck.crypt} />
          </div>
          <div className="basis-1/2">
            <TwdResultLibraryKeyCards library={deck.library} />
          </div>
        </>
      ) : (
        <>
          <div className="basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultCrypt crypt={deck.crypt} />
          </div>
          <div className="basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultLibraryByType library={deck.library} />
          </div>
          <div className="basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultLibraryKeyCards library={deck.library} />
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckBody;
