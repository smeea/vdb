import React, { useMemo } from 'react';
import { AnalyzeTournamentDeck, AnalyzeTournamentResultTotal } from '@/components';
import { useApp } from '@/context';
import { decksSort } from '@/utils';
import { RANK_HIGH_LOW, RANK_LOW_HIGH } from '@/utils/constants';

const AnalyzerTournamentResult = ({ decks }) => {
  const { analyzeSearchSort, changeAnalyzeSearchSort } = useApp();

  const sortMethods = {
    [RANK_HIGH_LOW]: 'R↓',
    [RANK_LOW_HIGH]: 'R↑',
  };

  const sortedDecks = useMemo(() => {
    return decksSort(decks, analyzeSearchSort);
  }, [decks, analyzeSearchSort]);

  return (
    <div>
      <AnalyzeTournamentResultTotal
        results={decks}
        sortMethods={sortMethods}
        sortMethod={analyzeSearchSort}
        setSortMethod={changeAnalyzeSearchSort}
      />
      <div className="flex flex-col gap-4">
        {sortedDecks.map((deck) => (
          <AnalyzeTournamentDeck deck={deck} key={deck.author} />
        ))}
      </div>
    </div>
  );
};

export default AnalyzerTournamentResult;
