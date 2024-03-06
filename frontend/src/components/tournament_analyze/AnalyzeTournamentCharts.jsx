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
    <div className="flex basis-full justify-between max-lg:flex-col max-lg:gap-3">
      <div className="flex basis-1/2 flex-col">
        <div className="flex flex-col items-center justify-center">
          <Title center>Playstyle</Title>
          <AnalyzeTournamentChartsStyle decks={decks} />
        </div>
        <AnalyzeTournamentChartsRankingStyle
          info={info}
          decks={decks}
          searchResults={searchResults}
        />
      </div>
      <div className="flex basis-1/2 flex-col">
        <div className="flex flex-col items-center justify-center">
          <Title center>Clans</Title>
          <AnalyzeTournamentChartsClan decks={decks} />
        </div>
        <AnalyzeTournamentChartsRankingClan
          info={info}
          decks={decks}
          searchResults={searchResults}
        />
      </div>
    </div>
  );
};

export default AnalyzeTournamentCharts;
