import React from 'react';
import { useSnapshot } from 'valtio';
import {
  AnalyzeLoadButton,
  AnalyzeTournamentDeck,
  AnalyzeTournamentInfo,
  AnalyzeTournamentCharts,
  AnalyzeTournamentResult,
  AnalyzeSearchForm,
} from '@/components';
import { analyzeStore } from '@/context';

const TournamentAnalyze = () => {
  const decks = useSnapshot(analyzeStore).all;
  const results = useSnapshot(analyzeStore).results;
  const info = useSnapshot(analyzeStore).info;

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
            <AnalyzeLoadButton />
            {decks && info && (
              <AnalyzeTournamentInfo info={info} decks={decks} />
            )}
          </div>
        </div>
        {decks && info && (
          <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="flex flex-col gap-4 sm:basis-7/12 sm:p-0 lg:basis-8/12 xl:basis-9/12">
              <AnalyzeTournamentResult
                decks={results ?? Object.values(decks)}
              />
            </div>
            <div className="basis-full p-2 sm:basis-5/12 sm:p-0 lg:basis-4/12 xl:basis-3/12">
              <AnalyzeSearchForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentAnalyze;
