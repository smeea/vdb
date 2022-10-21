import React from 'react';
import Select from 'react-select';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';

import { useApp } from 'context';

const DeckSelectRecent = ({ deckid, handleSelect }) => {
  // TODO FIX
  // setActiveDeck is default and props.setActiveDeck is used in Diff
  // to select deckFrom or deckTo
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
        <div className="d-flex justify-content-between">
          {i.name}
          <span className="gray">{getIcon(i.src)}</span>
        </div>
      ),
    };
  });

  return (
    <Select
      classNamePrefix="react-select"
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
