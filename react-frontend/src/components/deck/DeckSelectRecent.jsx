import React, { useContext } from 'react';
import Select from 'react-select';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import At from 'assets/images/icons/at.svg';
import AppContext from 'context/AppContext.js';

function DeckSelectRecent(props) {
  const { inventoryMode, setActiveDeck, recentDecks, isMobile } =
    useContext(AppContext);

  const options = recentDecks.map((i) => {
    return {
      value: i.deckid,
      name: 'deck',
      label: i.name,
    };
  });

  const handleChange = (e) => {
    if (e.value === 32) {
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
