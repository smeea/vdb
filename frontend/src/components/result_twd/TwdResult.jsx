import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TwdResultTotal,
  TwdResultDescription,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
  Button,
  ButtonFloatClose,
  Hr,
} from '@/components';
import { decksSort } from '@/utils';
import { useApp } from '@/context';
import { useFetch, useDeck } from '@/hooks';

const Deck = ({ deckid, withHr }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const url = `${import.meta.env.VITE_API_URL}/twd/${deckid}`;
  const { value: deck } = useFetch(url, {}, []);
  if (deck) {
    const cardsData = useDeck(deck.cards, cryptCardBase, libraryCardBase);
    deck.crypt = cardsData.crypt;
    deck.library = cardsData.library;
  }

  return (
    <>
      {deck && (
        <div className="space-y-6">
          <div className="flex gap-2 max-lg:flex-col">
            <div className="basis-full lg:basis-1/4">
              <TwdResultDescription deck={deck} />
            </div>
            <div className="flex basis-full gap-2 lg:basis-3/4">
              <div className="basis-1/2 md:basis-1/3">
                <TwdResultCryptTable crypt={deck.crypt} />
              </div>
              <div className="max-md:hidden md:basis-1/3">
                <TwdResultLibraryByTypeTable library={deck.library} />
              </div>
              <div className="basis-1/2 md:basis-1/3">
                <TwdResultLibraryKeyCardsTable library={deck.library} />
              </div>
            </div>
          </div>
          {withHr && <Hr isThick />}
        </div>
      )}
    </>
  );
};

const TwdResult = ({ results, setResults }) => {
  const { isMobile, showFloatingButtons, twdSearchSort, changeTwdSearchSort } =
    useApp();
  const navigate = useNavigate();
  const showCounterStep = 10;
  const deckCounter = results.length || 0;
  const [showCounter, setShowCounter] = useState(showCounterStep);

  const sortMethods = {
    'Date - New to Old': 'D↓',
    'Date - Old to New': 'D↑',
    Players: 'P',
  };

  const handleClear = () => {
    navigate('/twd');
    setResults(undefined);
  };

  const sortedDecks = useMemo(() => {
    return decksSort(results, twdSearchSort);
  }, [results, twdSearchSort]);

  const resultEntries = useMemo(() => {
    if (sortedDecks) {
      return sortedDecks.slice(1, showCounter + 1).map((d) => d.deckid);
    } else return [];
  }, [sortedDecks, showCounter, twdSearchSort]);

  return (
    <>
      <TwdResultTotal
        results={results}
        sortMethods={sortMethods}
        sortMethod={twdSearchSort}
        setSortMethod={changeTwdSearchSort}
      />
      <div className="space-y-4">
        {resultEntries.map((deckid, idx) => {
          return (
            <Deck key={deckid} deckid={deckid} withHr={idx + 1 < showCounter} />
          );
        })}
        {deckCounter > showCounter && (
          <div className="flex justify-center ">
            <Button
              variant="primary"
              onClick={() => setShowCounter(showCounter + showCounterStep)}
            >
              Show More ({deckCounter - showCounter} left)
            </Button>
          </div>
        )}
      </div>
      {isMobile && showFloatingButtons && (
        <ButtonFloatClose handleClose={handleClear} />
      )}
    </>
  );
};

export default TwdResult;
