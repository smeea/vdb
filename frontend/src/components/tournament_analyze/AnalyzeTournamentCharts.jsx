import React from 'react';
import {
  AnalyzeTournamentChartsStyle,
  AnalyzeTournamentChartsClan,
  Title,
} from '@/components';

const AnalyzeTournamentCharts = ({ decks }) => {
  return (
    <div className="flex flex-col basis-full py-4">
      <div className="flex">
        <div className="flex flex-col justify-center h-[450px] w-[500px]">
          <Title center>Playstyle</Title>
          <AnalyzeTournamentChartsStyle decks={decks} />
          {/* TODO Playstyle BubbleChart with Rank*/}
        </div>
        <div className="flex flex-col justify-center h-[450px] w-[550px]">
          <Title center>Clans</Title>
          <AnalyzeTournamentChartsClan decks={decks} />
          {/* TODO Clan BubbleChart with Rank*/}
        </div>
      </div>
      <div className="flex">
        {/* TODO Search result BubbleChart with Rank of Known decks*/}
      </div>
    </div>
  );
};

export default AnalyzeTournamentCharts;
