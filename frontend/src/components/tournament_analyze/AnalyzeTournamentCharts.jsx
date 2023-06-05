import React from 'react';
import {
  AnalyzeTournamentChartsStyle,
  AnalyzeTournamentChartsClan,
  Title,
} from '@/components';

const AnalyzeTournamentCharts = ({ info, decks }) => {
  return (
    <div className="flex border gap-4 py-4">
      <div className="flex flex-col justify-center h-[450px] w-[450px]">
        <Title center>Playstyle</Title>
        <AnalyzeTournamentChartsStyle decks={decks} />
      </div>
      <div className="flex flex-col justify-center h-[450px] w-[550px]">
        <Title center>Clans</Title>
        <AnalyzeTournamentChartsClan decks={decks} />
      </div>
    </div>
  );
};

export default AnalyzeTournamentCharts;
