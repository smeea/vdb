import React from 'react';
import {
  TwdResultDescription,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
} from '@/components';
import { useFetch } from '@/hooks';
import { parseDeck } from '@/utils';
import { useApp } from '@/context';
import { DECKID, CRYPT, LIBRARY } from '@/constants';

const TwdHallFameDeckBody = ({ deck }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const url = `${import.meta.env.VITE_API_URL}/deck/${deck[DECKID]}`;
  const { value } = useFetch(url, {}, []);
  const cards = parseDeck(value?.cards, cryptCardBase, libraryCardBase);

  return (
    <div className="flex gap-2">
      <div className="basis-full xl:basis-1/4">
        <TwdResultDescription deck={deck} />
      </div>
      <div className="flex basis-full gap-2 xl:basis-3/4">
        {isMobile ? (
          <>
            <div className="basis-1/2">
              <TwdResultCryptTable crypt={cards[CRYPT]} />
            </div>
            <div className="basis-1/2">
              <TwdResultLibraryKeyCardsTable library={deck[LIBRARY]} />
            </div>
          </>
        ) : (
          <>
            <div className="basis-full md:basis-1/3">
              <TwdResultCryptTable crypt={cards[CRYPT]} />
            </div>
            <div className="basis-full md:basis-1/3">
              <TwdResultLibraryByTypeTable library={cards[LIBRARY]} />
            </div>
            <div className="basis-full md:basis-1/3">
              <TwdResultLibraryKeyCardsTable library={cards[LIBRARY]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TwdHallFameDeckBody;
