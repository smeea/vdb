import React from 'react';
import {
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';

const TwdHallFameDeckBody = ({ deck, isMobile }) => {
  return (
    <div className="mx-0 flex flex-row py-0 px-0">
      <div
        className={`
           basis-full md:basis-full xl:basis-1/4
             ${isMobile ? 'px-0' : 'pl-0 pr-2'}`}
      >
        <TwdResultDescription deck={deck} />
      </div>
      {isMobile ? (
        <>
          <div className="pl-0 pr-1 basis-1/2">
            <TwdResultCrypt crypt={deck.crypt} />
          </div>
          <div className="pl-1 pr-0 basis-1/2">
            <TwdResultLibraryKeyCards library={deck.library} />
          </div>
        </>
      ) : (
        <>
          <div className="basis-full px-2 md:basis-1/3 xl:basis-1/4">
            <TwdResultCrypt crypt={deck.crypt} />
          </div>
          <div className="basis-full px-2 md:basis-1/3 xl:basis-1/4">
            <TwdResultLibraryByType library={deck.library} />
          </div>
          <div className="pr-0 pl-2 basis-full md:basis-1/3 xl:basis-1/4">
            <TwdResultLibraryKeyCards library={deck.library} />
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckBody;
