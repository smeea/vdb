import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TwdDeck, TwdResultTotal, Button, ButtonFloatClose } from '@/components';
import { decksSort } from '@/utils';
import { useApp } from '@/context';

const TwdResult = ({ results, setResults }) => {
  const { isMobile, showFloatingButtons, twdSearchSort, changeTwdSearchSort } = useApp();
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

  const showedDecks = useMemo(() => {
    return sortedDecks.slice(0, showCounter);
  }, [sortedDecks, showCounter, twdSearchSort]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <TwdResultTotal
            results={results}
            sortMethods={sortMethods}
            sortMethod={twdSearchSort}
            setSortMethod={changeTwdSearchSort}
          />
          <div className="flex flex-col gap-4">
            {showedDecks.map((d) => {
              return <TwdDeck key={d.deckid} deck={d} />;
            })}
          </div>
        </div>
        {deckCounter > showCounter && (
          <div className="flex justify-center">
            <Button variant="primary" onClick={() => setShowCounter(showCounter + showCounterStep)}>
              Show More ({deckCounter - showCounter} left)
            </Button>
          </div>
        )}
      </div>
      {isMobile && showFloatingButtons && <ButtonFloatClose handleClose={handleClear} />}
    </>
  );
};

export default TwdResult;
