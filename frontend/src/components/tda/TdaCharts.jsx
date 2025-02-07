import {
  TdaChartsClan,
  TdaChartsRankingClan,
  TdaChartsRankingStyle,
  TdaChartsStyle,
  Title,
} from '@/components';

const TdaCharts = ({ info, decks, searchResults }) => {
  return (
    <div className="flex basis-full justify-between max-lg:flex-col max-lg:gap-3">
      <div className="flex basis-1/2 flex-col">
        <div className="flex flex-col items-center justify-center">
          <Title center>Playstyle</Title>
          <TdaChartsStyle decks={decks} />
        </div>
        <TdaChartsRankingStyle info={info} decks={decks} searchResults={searchResults} />
      </div>
      <div className="flex basis-1/2 flex-col">
        <div className="flex flex-col items-center justify-center">
          <Title center>Clans</Title>
          <TdaChartsClan decks={decks} />
        </div>
        <TdaChartsRankingClan info={info} decks={decks} searchResults={searchResults} />
      </div>
    </div>
  );
};

export default TdaCharts;
