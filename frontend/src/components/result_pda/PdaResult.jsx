import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  Button,
  PdaResultDescription,
  TwdResultTotal,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';
import { decksSort } from 'utils';
import { useApp } from 'context';
import { useDeck } from 'hooks';

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
  const showCounterStep = 20;
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

          const cardsData = useDeck(deck.cards, cryptCardBase, libraryCardBase);
          Object.values({ ...cardsData.crypt, ...cardsData.library }).map(
            (card) => {
              if (card.q === 0) {
                if (card.c.Id > 200000) {
                  delete cardsData.crypt[card.c.Id];
                } else {
                  delete cardsData.library[card.c.Id];
                }
              }
            }
          );
          deck.crypt = cardsData.crypt;
          deck.library = cardsData.library;

          return (
            <React.Fragment key={deck['deckid']}>
              <div className="flex flex-wrap py-2 px-0 mx-0">
                <div
                  className={`basis-full xl:basis-1/4 ${
                    isMobile ? 'px-0' : 'px-0'
                  }`}
                >
                  <PdaResultDescription deck={deck} />
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
                    <div className="basis-full md:basis-1/3 xl:basis-1/4">
                      <TwdResultCrypt crypt={deck['crypt']} />
                    </div>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4">
                      <TwdResultLibraryByType library={deck['library']} />
                    </div>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4">
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
  }, [sortedDecks, showCounter, pdaSearchSort]);

  return (
    <>
      <TwdResultTotal
        results={results}
        sortMethods={sortMethods}
        sortMethod={pdaSearchSort}
        setSortMethod={changePdaSearchSort}
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

export default PdaResult;
