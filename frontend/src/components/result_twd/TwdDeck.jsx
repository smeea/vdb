import React from 'react';
import {
  PdaResultDescription,
  TwdResultDescription,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
  Hr,
} from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';
import { parseDeck } from '@/utils';
import { CRYPT, LIBRARY, DECKID } from '@/constants';

const TwdDeck = ({ deck, inPda }) => {
  const { cryptCardBase, libraryCardBase, isNarrow } = useApp();
  if (deck.cards) {
    deck = { ...deck, ...parseDeck(deck.cards, cryptCardBase, libraryCardBase) };
  } else {
    const url = `${import.meta.env.VITE_API_URL}/${inPda ? 'pda' : 'twd'}/${deck[DECKID]}`;
    const { value: d } = useFetch(url, {}, []);
    if (d) {
      deck = {
        ...d,
        ...parseDeck(d.cards, cryptCardBase, libraryCardBase),
      };
    }
  }

  return (
    <>
      {deck[CRYPT] && deck[LIBRARY] && (
        <div className="group flex flex-col gap-6">
          <div className="flex gap-2 max-lg:flex-col">
            <div className="basis-full lg:basis-1/4">
              {inPda ? <PdaResultDescription deck={deck} /> : <TwdResultDescription deck={deck} />}
            </div>
            <div className="flex basis-full gap-2 lg:basis-3/4">
              <div className="basis-1/2 md:basis-4/12">
                <TwdResultCryptTable crypt={deck[CRYPT]} />
              </div>
              <div className="max-md:hidden md:basis-3/12">
                <TwdResultLibraryByTypeTable library={deck[LIBRARY]} />
              </div>
              <div className="basis-1/2 md:basis-5/12">
                <TwdResultLibraryKeyCardsTable withHeader={isNarrow} library={deck[LIBRARY]} />
              </div>
            </div>
          </div>
          <div className="group-last:hidden">
            <Hr isThick />
          </div>
        </div>
      )}
    </>
  );
};

export default TwdDeck;
