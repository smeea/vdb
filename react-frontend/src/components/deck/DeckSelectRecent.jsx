import React, { useContext } from 'react';
import Select from 'react-select';
import AppContext from 'context/AppContext.js';

function DeckSelectRecent(props) {
  const { setActiveDeck, recentDecks, isMobile } = useContext(AppContext);

  const options = recentDecks.map((i) => {
    return {
      value: i.deckid,
      name: 'deck',
      label: `${i.name} ${i.deckid.length === 32 ? '' : '[TWD] '}`,
    };
  });

  const handleChange = (e) => {
    if (e.value.length === 32) {
      setActiveDeck({ src: 'shared', deckid: e.value });
    } else {
      setActiveDeck({ src: 'twd', deckid: e.value });
    }
  };

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={!isMobile}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === props.activeDeck.deckid)}
      onChange={handleChange}
    />
  );
}

export default DeckSelectRecent;
