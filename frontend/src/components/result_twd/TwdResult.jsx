import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import {
  TwdResultTotal,
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
  Button,
} from 'components';
import { decksSort } from 'utils';
import { useApp } from 'context';
import { useDeck } from 'hooks';

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
  const showCounterStep = 20;
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
            <React.Fragment key={deck['deckid']}>
              <div className="flex flex-row py-2 px-0 mx-0">
                <div
                  className={`basis-full md:basis-full xl:basis-1/4 ${
                    isMobile ? 'px-0' : 'ps-0 pe-2'
                  }`}
                >
                  <TwdResultDescription deck={deck} />
                </div>
                {isMobile ? (
                  <>
                    <div className="basis-1/2 ps-0 pe-1">
                      <TwdResultCrypt crypt={deck['crypt']} />
                    </div>
                    <div className="basis-1/2 ps-1 pe-0">
                      <TwdResultLibraryKeyCards library={deck['library']} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4 px-2">
                      <TwdResultCrypt crypt={deck['crypt']} />
                    </div>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4 px-2">
                      <TwdResultLibraryByType library={deck['library']} />
                    </div>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4 pe-0 ps-2">
                      <TwdResultLibraryKeyCards library={deck['library']} />
                    </div>
                  </>
                )}
              </div>
              {index + 1 < showCounter && <hr className="mx-0 thick" />}
            </React.Fragment>
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
      {resultEntries}
      {deckCounter > showCounter && (
        <div className="flex justify-center pb-4 pt-2">
          <Button
            variant="primary"
            onClick={() => setShowCounter(showCounter + showCounterStep)}
          >
            Show More ({deckCounter - showCounter} left)
          </Button>
        </div>
      )}
      {isMobile && showFloatingButtons && (
        <>
          <div
            onClick={handleClear}
            className="flex float-right-bottom float-clear items-center justify-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
        </>
      )}
    </>
  );
};

export default TwdResult;
