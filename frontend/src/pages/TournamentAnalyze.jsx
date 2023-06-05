import React, { useState } from 'react';
import {
  AnalyzeLoadButton,
  AnalyzeTournamentDeck,
  AnalyzeTournamentInfo,
  AnalyzeTournamentCharts,
} from '@/components';

const TournamentAnalyze = () => {
  const [decks, setDecks] = useState();
  const [scores, setScores] = useState();
  const [info, setInfo] = useState();

  return (
    <div className="search-container mx-auto">
      <div className="flex flex-col gap-4">
        <AnalyzeLoadButton
          isDecks={!!decks}
          isScores={!!scores}
          setScores={setScores}
          setDecks={setDecks}
          setInfo={setInfo}
        />
        {info && (
          <>
            <AnalyzeTournamentInfo info={info} decks={decks} />
            <AnalyzeTournamentCharts info={info} decks={decks} />
          </>
        )}
        {decks && (
          <div className="flex flex-col gap-4 border">
            {Object.values(decks).map((deck) => (
              <AnalyzeTournamentDeck deck={deck} key={deck.author} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentAnalyze;
