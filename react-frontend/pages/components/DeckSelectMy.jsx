import React, { useContext } from 'react';
import Select from 'react-select';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';
import AppContext from '../../context/AppContext.js';

function DeckSelectMy(props) {
  const { inventoryMode, setActiveDeck, decks, isMobile } =
    useContext(AppContext);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const preOptions = Object.keys(decks)
    .filter((i) => !decks[i].master)
    .map((i, index) => {
      return [
        {
          value: i,
          name: 'deck',
          label: (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-inline trimmed">{decks[i]['name']}</div>
              <div className="d-flex align-items-center pl-2 small">
                {inventoryMode && (
                  <div className="pr-2">
                    {decks[i].inventory_type == 's' && <Shuffle />}
                    {decks[i].inventory_type == 'h' && <PinAngleFill />}
                    {!decks[i].inventory_type && <At />}
                  </div>
                )}
                {new Date(decks[i]['timestamp']).toISOString().slice(0, 10)}
              </div>
            </div>
          ),
        },
        decks[i]['timestamp'],
      ];
    });

  const options = preOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children;
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={!isMobile}
      filterOption={filterOption}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => {
        if (
          decks[props.activeDeck.deckid] &&
          decks[props.activeDeck.deckid].master
        ) {
          return obj.value === decks[props.activeDeck.deckid].master;
        } else {
          return obj.value === props.activeDeck.deckid;
        }
      })}
      onChange={(e) => setActiveDeck({ src: 'my', deckid: e.value })}
    />
  );
}

export default DeckSelectMy;
