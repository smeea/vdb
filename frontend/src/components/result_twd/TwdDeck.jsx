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
import { useFetch, useDeck } from '@/hooks';

const TwdDeck = ({ deck, inPda, withHr }) => {
  const { cryptCardBase, libraryCardBase, isNarrow } = useApp();
  if (deck.cards) {
    deck = { ...deck, ...useDeck(deck.cards, cryptCardBase, libraryCardBase) };
  } else {
    const url = `${import.meta.env.VITE_API_URL}/${inPda ? 'pda' : 'twd'}/${deck.deckid}`;
    const { value: d } = useFetch(url, {}, []);
    if (d) {
      deck = {
        ...deck,
        ...d,
        ...useDeck(d.cards, cryptCardBase, libraryCardBase),
      };
    }
  }

  return (
    <>
      {deck.crypt && deck.library && (
        <div className="space-y-6">
          <div className="flex gap-2 max-lg:flex-col">
            <div className="basis-full lg:basis-1/4">
              {inPda ? <PdaResultDescription deck={deck} /> : <TwdResultDescription deck={deck} />}
            </div>
            <div className="flex basis-full gap-2 lg:basis-3/4">
              <div className="basis-1/2 md:basis-1/3">
                <TwdResultCryptTable crypt={deck.crypt} />
              </div>
              <div className="max-md:hidden md:basis-1/3">
                <TwdResultLibraryByTypeTable library={deck.library} />
              </div>
              <div className="basis-1/2 md:basis-1/3">
                <TwdResultLibraryKeyCardsTable withHeader={isNarrow} library={deck.library} />
              </div>
            </div>
          </div>
          {withHr && <Hr isThick />}
        </div>
      )}
    </>
  );
};

export default TwdDeck;
