import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import X from '@/assets/images/icons/x.svg';
import {
  PdaResultDescription,
  TwdResultTotal,
  TwdResultCryptTable,
  TwdResultLibraryByTypeTable,
  TwdResultLibraryKeyCardsTable,
  Button,
  ButtonFloat,
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
              <div className="flex flex-row ">
                <div
                  className={`basis-full md:basis-full xl:basis-1/4 ${isMobile ? '' : ''
                    }`}
                >
                  <PdaResultDescription deck={deck} />
                </div>
                {isMobile ? (
                  <>
                    <div className="basis-1/2 ">
                      <TwdResultCryptTable crypt={deck['crypt']} />
                    </div>
                    <div className="basis-1/2 ">
                      <TwdResultLibraryKeyCardsTable library={deck['library']} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4">
                      <TwdResultCryptTable crypt={deck['crypt']} />
                    </div>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4">
                      <TwdResultLibraryByTypeTable library={deck['library']} />
                    </div>
                    <div className="basis-full md:basis-1/3 xl:basis-1/4 ">
                      <TwdResultLibraryKeyCardsTable library={deck['library']} />
                    </div>
                  </>
                )}
              </div>
              {index + 1 < showCounter && <Hr isThick />}
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
      <div className="space-y-4">{resultEntries}</div>
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
      {isMobile && showFloatingButtons && (
        <ButtonFloat onClick={handleClear} variant="danger">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default PdaResult;
