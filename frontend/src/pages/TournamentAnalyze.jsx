import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  AnalyzeLoadButton,
  AnalyzeTournamentDeck,
  AnalyzeTournamentInfo,
  AnalyzeTournamentCharts,
  AnalyzeSearchForm,
} from '@/components';
import {
  setAnalyzeDecks,
  setAnalyzeInfo,
  setAnalyzeResults,
  analyzeStore,
} from '@/context';

const TournamentAnalyze = () => {
  const decks = useSnapshot(analyzeStore).all;
  const results = useSnapshot(analyzeStore).results;
  const info = useSnapshot(analyzeStore).info;
  const [error, setError] = useState();

  return (
    <div className="twd-container mx-auto">
      <div className="flex flex-col sm:gap-4 lg:gap-6 xl:gap-8">
        <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
          <div className="flex basis-9/12">
            {decks && info && (
              <AnalyzeTournamentCharts info={info} decks={decks} />
            )}
          </div>
          <div className="flex basis-3/12 flex-col sm:gap-4 lg:gap-6 xl:gap-8">
            <AnalyzeLoadButton
              setDecks={setAnalyzeDecks}
              setInfo={setAnalyzeInfo}
              isDecks={!!decks}
              isInfo={!!info}
            />
            {decks && info && (
              <AnalyzeTournamentInfo info={info} decks={decks} />
            )}
          </div>
        </div>
        {decks && info && (
          <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="flex flex-col sm:basis-7/12 sm:p-0 lg:basis-8/12 xl:basis-9/12 gap-4">
              {results &&
                Object.values(results).map((deck) => (
                  <AnalyzeTournamentDeck deck={deck} key={deck.author} />
                ))}
            </div>
            <div className="basis-full p-2 sm:basis-5/12 sm:p-0 lg:basis-4/12 xl:basis-3/12">
              <AnalyzeSearchForm error={error} setError={setError} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentAnalyze;
