import React from 'react';
import {
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';

const TwdHallFameDeckBody = ({ deck, isMobile }) => {
  return (
    <div className="flex flex-row py-0 px-0 mx-0">
      <div
        className={`
           basis-full md:basis-full xl:basis-1/4
             ${isMobile ? 'px-0' : 'ps-0 pe-2'}`}
      >
        <TwdResultDescription deck={deck} />
      </div>
      {isMobile ? (
        <>
          <div className="basis-1/2 ps-0 pe-1">
            <TwdResultCrypt crypt={deck.crypt} />
          </div>
          <div className="basis-1/2 ps-1 pe-0">
            <TwdResultLibraryKeyCards library={deck.library} />
          </div>
        </>
      ) : (
        <>
          <div className="basis-full md:basis-1/3 xl:basis-1/4 px-2">
            <TwdResultCrypt crypt={deck.crypt} />
          </div>
          <div className="basis-full md:basis-1/3 xl:basis-1/4 px-2">
            <TwdResultLibraryByType library={deck.library} />
          </div>
          <div className="basis-full md:basis-1/3 xl:basis-1/4 pe-0 ps-2">
            <TwdResultLibraryKeyCards library={deck.library} />
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckBody;
