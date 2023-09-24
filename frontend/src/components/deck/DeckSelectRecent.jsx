import React from 'react';
import { Select } from '@/components';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import { useApp } from '@/context';

const DeckSelectRecent = ({ deckid, handleSelect }) => {
  const { recentDecks, isMobile } = useApp();

  const getIcon = (src) => {
    switch (src) {
      case 'twd':
        return <TrophyFill />;
      case 'pda':
        return <PeopleFill />;
    }
  };

  const options = recentDecks.map((i) => {
    return {
      value: i.deckid,
      name: 'deck',
      label: (
        <div className="flex justify-between">
          {i.name}
          <span className="text-midGray dark:text-midGrayDark">
            {getIcon(i.src)}
          </span>
        </div>
      ),
    };
  });

  return (
    <Select
      options={options}
      isSearchable={!isMobile}
      name="decks"
      maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === deckid)}
      onChange={handleSelect}
    />
  );
};

export default DeckSelectRecent;
