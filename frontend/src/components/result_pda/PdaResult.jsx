import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PdaResultDescription,
  TwdResultTotal,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
  Button,
  ButtonFloatClose,
  Hr,
} from '@/components';
import { decksSort } from '@/utils';
import { useApp } from '@/context';
import { useDeck } from '@/hooks';

const PdaResult = ({ results, setResults }) => {
  const {
    isMobile,
    showFloatingButtons,
    pdaSearchSort,
    changePdaSearchSort,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const navigate = useNavigate();
  const showCounterStep = 10;
  const deckCounter = results.length || 0;
  const [showCounter, setShowCounter] = useState(showCounterStep);

  const sortMethods = {
    'Date - New to Old': 'D↓',
    'Date - Old to New': 'D↑',
    Favorites: 'F',
  };

  const handleClear = () => {
    navigate('/pda');
    setResults(undefined);
  };

  const sortedDecks = useMemo(() => {
    return decksSort(results, pdaSearchSort);
  }, [results, pdaSearchSort]);

  const resultEntries = useMemo(() => {
    if (sortedDecks) {
      let newCounter = showCounter;

      return sortedDecks.map((d, index) => {
        const deck = { ...d };
        while (newCounter > 0) {
          newCounter -= 1;

          const { crypt, library } = useDeck(
            deck.cards,
            cryptCardBase,
            libraryCardBase
          );
          Object.values(crypt).map((card) => {
            card.q === 0 && delete crypt[card.c.Id];
          });
          Object.values(library).map((card) => {
            card.q === 0 && delete library[card.c.Id];
          });

          deck.crypt = crypt;
          deck.library = library;

          return (
            <div className="space-y-6" key={deck.deckid}>
              <div className="flex gap-2 max-lg:flex-col">
                <div className="basis-full lg:basis-1/4">
                  <PdaResultDescription deck={deck} />
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
              {index + 1 < showCounter && <Hr isThick />}
            </div>
          );
        }
      });
    } else return [];
  }, [sortedDecks, showCounter, pdaSearchSort]);

  return (
    <>
      <TwdResultTotal
        results={results}
        sortMethods={sortMethods}
        sortMethod={pdaSearchSort}
        setSortMethod={changePdaSearchSort}
      />
      <div className="space-y-4">
        {resultEntries}
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

export default PdaResult;
