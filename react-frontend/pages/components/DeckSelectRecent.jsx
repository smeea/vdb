import React, { useContext } from 'react';
import Select from 'react-select';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';
import AppContext from '../../context/AppContext.js';

function DeckSelectRecent(props) {
  const { inventoryMode, setActiveDeck, recentDecks, isMobile } =
    useContext(AppContext);

  const options = Object.keys(recentDecks).map((i) => {
    return {
      value: i,
      name: 'deck',
      label: recentDecks[i]['name'],
    };
  });

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={!isMobile}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === props.activeDeck.deckid)}
      onChange={(e) => setActiveDeck({ src: 'recent', deckid: e.value })}
    />
  );
}

export default DeckSelectRecent;
