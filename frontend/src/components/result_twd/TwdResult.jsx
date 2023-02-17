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
import { useDeck } from '@/hooks';

const TwdResult = ({ results, setResults }) => {
  const {
    isMobile,
    showFloatingButtons,
    twdSearchSort,
    changeTwdSearchSort,
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
      let newCounter = showCounter;

      return sortedDecks.map((d, index) => {
        const deck = { ...d };
        while (newCounter > 0) {
          newCounter -= 1;

          const cardsData = useDeck(deck.cards, cryptCardBase, libraryCardBase);
          deck.crypt = cardsData.crypt;
          deck.library = cardsData.library;

          return (
            <div className="space-y-6" key={deck.deckid}>
              <div className="flex flex-col gap-2 lg:flex-row">
                <div className="basis-full lg:basis-1/4">
                  <TwdResultDescription deck={deck} />
                </div>
                <div className="flex basis-full gap-2 lg:basis-3/4">
                  <div className="basis-1/2 sm:basis-1/3">
                    <TwdResultCryptTable crypt={deck['crypt']} />
                  </div>
                  <div className="max-sm:hidden sm:basis-1/3">
                    <TwdResultLibraryByTypeTable library={deck['library']} />
                  </div>
                  <div className="basis-1/2 sm:basis-1/3">
                    <TwdResultLibraryKeyCardsTable library={deck['library']} />
                  </div>
                </div>
              </div>
              {index + 1 < showCounter && <Hr isThick />}
            </div>
          );
        }
      });
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

export default TwdResult;
