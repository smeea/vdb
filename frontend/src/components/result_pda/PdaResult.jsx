import { useMemo, useState } from "react";
import { Button, TwdDeck, TwdDeckWrapper, TwdResultTotal } from "@/components";
import { CARDS, DATE_NEW_OLD, DATE_OLD_NEW, DECKID, FAVORITES } from "@/constants";
import { useApp } from "@/context";
import { decksSort } from "@/utils";

const PdaResult = ({ results = [] }) => {
  const { pdaSearchSort, changePdaSearchSort } = useApp();
  const SHOW_COUNTER_STEP = 10;
  const deckCounter = results.length;
  const [showCounter, setShowCounter] = useState(SHOW_COUNTER_STEP);

  const sortMethods = {
    [DATE_NEW_OLD]: "D↓",
    [DATE_OLD_NEW]: "D↑",
    [FAVORITES]: "F",
  };

  const sortedDecks = useMemo(() => {
    return decksSort(results, pdaSearchSort);
  }, [results, pdaSearchSort]);

  const showedDecks = useMemo(() => {
    return sortedDecks.slice(0, showCounter);
  }, [sortedDecks, showCounter, pdaSearchSort]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <TwdResultTotal
          results={results}
          sortMethods={sortMethods}
          sortMethod={pdaSearchSort}
          setSortMethod={changePdaSearchSort}
        />
        <div className="flex flex-col gap-4">
          {showedDecks.map((d) => {
            return d[CARDS] ? (
              <TwdDeck key={d[DECKID]} deck={d} inPda />
            ) : (
              <TwdDeckWrapper key={d[DECKID]} deckid={d[DECKID]} inPda />
            );
          })}
        </div>
      </div>
      {deckCounter > showCounter && (
        <div className="flex justify-center">
          <Button onClick={() => setShowCounter(showCounter + SHOW_COUNTER_STEP)}>
            Show More ({deckCounter - showCounter} left)
          </Button>
        </div>
      )}
    </div>
  );
};

export default PdaResult;
