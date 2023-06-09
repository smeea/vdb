import React from 'react';
import {
  AnalyzeTournamentChartsRankingStyle,
  AnalyzeTournamentChartsRankingClan,
  AnalyzeTournamentChartsStyle,
  AnalyzeTournamentChartsClan,
  Title,
} from '@/components';

const AnalyzeTournamentCharts = ({ info, scores, decks }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col basis-1/2">
          <div className="flex flex-col justify-center">
            <Title center>Playstyle</Title>
            <AnalyzeTournamentChartsStyle decks={decks} />
          </div>
          <div className="flex flex-col justify-center">
            <AnalyzeTournamentChartsRankingStyle
              info={info}
              scores={scores}
              decks={decks}
            />
          </div>
        </div>

        <div className="flex flex-col basis-1/2">
          <div className="flex flex-col justify-center">
            <Title center>Clans</Title>
            <AnalyzeTournamentChartsClan decks={decks} />
          </div>
          <div className="flex flex-col justify-center">
            <AnalyzeTournamentChartsRankingClan
              info={info}
              scores={scores}
              decks={decks}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        {/* TODO Search result BubbleChart with Rank of Known decks*/}
      </div>
    </div>
  );
};

export default AnalyzeTournamentCharts;
