import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TwdDeck, TwdResultTotal, Button, ButtonFloatClose } from '@/components';
import { decksSort } from '@/utils';
import { useApp } from '@/context';

const PdaResult = ({ results, setResults }) => {
  const { isMobile, showFloatingButtons, pdaSearchSort, changePdaSearchSort } = useApp();
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

  const showedDecks = useMemo(() => {
    return sortedDecks.slice(0, showCounter);
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
        {showedDecks.map((d, idx) => {
          return <TwdDeck key={d.deckid} deck={d} withHr={idx + 1 < showCounter} inPda />;
        })}

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

export default PdaResult;
