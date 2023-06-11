import React, { useState } from 'react';
import {
  AnalyzeLoadButton,
  AnalyzeTournamentDeck,
  AnalyzeTournamentInfo,
  AnalyzeTournamentCharts,
  AnalyzeSearchForm,
} from '@/components';

const TournamentAnalyze = () => {
  const [decks, setDecks] = useState();
  const [info, setInfo] = useState();
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
              setDecks={setDecks}
              setInfo={setInfo}
              isDecks={!!decks}
              isInfo={!!info}
            />
            {decks && info && (
              <AnalyzeTournamentInfo info={info} decks={decks} />
            )}
          </div>
        </div>
        {info && decks && (
          <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="flex flex-col gap-4">
              {Object.values(decks).map((deck) => (
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
