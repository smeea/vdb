import PeopleFill from "@icons/people-fill.svg?react";
import TrophyFill from "@icons/trophy-fill.svg?react";
import paths from "@/assets/data/paths.json";
import { ResultPathImage, ResultPreconClan, Select } from "@/components";
import { CLAN, DECK, DECKID, DECKS, NAME, PDA, TWD } from "@/constants";
import { useApp } from "@/context";

const DeckSelectRecent = ({ deckid, handleSelect }) => {
  const { recentDecks, isMobile } = useApp();

  const getIcon = (src) => {
    switch (src) {
      case TWD:
        return <TrophyFill />;
      case PDA:
        return <PeopleFill />;
    }
  };

  const options = recentDecks.map((i) => {
    return {
      value: i[DECKID],
      name: DECK,
      label: (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex w-[35px] items-center justify-center pr-1">
              {i[CLAN] &&
                (paths.includes(i[CLAN]) ? (
                  <ResultPathImage value={i[CLAN]} />
                ) : (
                  <ResultPreconClan clan={i[CLAN]} />
                ))}
            </div>
            <div className="inline">
              {i[NAME].slice(0, 32)}
            </div>
          </div>
          <div className="flex w-[20px] items-center justify-center text-midGray dark:text-midGrayDark">
            {getIcon(i.src)}
          </div>
        </div>
      ),
    };
  });

  return (
    <Select
      options={options}
      isSearchable={!isMobile}
      name={DECKS}
      maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === deckid)}
      onChange={handleSelect}
    />
  );
};

export default DeckSelectRecent;
