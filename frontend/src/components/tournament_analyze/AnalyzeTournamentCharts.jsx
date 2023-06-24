import React from 'react';
import {
  AnalyzeTournamentChartsRankingStyle,
  AnalyzeTournamentChartsRankingClan,
  AnalyzeTournamentChartsStyle,
  AnalyzeTournamentChartsClan,
  Title,
} from '@/components';

const AnalyzeTournamentCharts = ({ info, decks, searchResults }) => {
  return (
    <>
      <div className="flex basis-1/2 flex-col">
        <div className="flex flex-col items-center justify-center">
          <Title center>Playstyle</Title>
          <AnalyzeTournamentChartsStyle decks={decks} />
        </div>
        <div className="flex flex-col justify-center">
          <AnalyzeTournamentChartsRankingStyle
            info={info}
            decks={decks}
            searchResults={searchResults}
          />
        </div>
      </div>
      <div className="flex basis-1/2 flex-col">
        <div className="flex flex-col items-center justify-center">
          <Title center>Clans</Title>
          <AnalyzeTournamentChartsClan decks={decks} />
        </div>
        <div className="flex flex-col justify-center">
          <AnalyzeTournamentChartsRankingClan
            info={info}
            decks={decks}
            searchResults={searchResults}
          />
        </div>
      </div>
    </>
  );
};

export default AnalyzeTournamentCharts;
