import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Shuffle from '../../assets/images/icons/shuffle.svg'
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg'
import At from '../../assets/images/icons/at.svg';

function DeckSelectMy(props) {
  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const preOptions = Object.keys(props.decks).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            {props.decks[i]['name']}
            <div className="d-flex align-items-center pl-2 small">
              {props.inventoryMode &&
               <div className="pr-2">
                 {props.decks[i].inventory_type == 's' &&
                  <Shuffle/>
                 }
                 {props.decks[i].inventory_type == 'h' &&
                  <PinAngleFill/>
                 }
                 {!props.decks[i].inventory_type &&
                  <At/>
                 }
               </div>
              }
              {new Date(props.decks[i]['timestamp']).toISOString().slice(0, 10)}
            </div>
          </div>
        ),
      },
      props.decks[i]['timestamp'],
    ];
  });

  const options = preOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  return (
    <Select
      options={options}
      isSearchable={false}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === props.activeDeck.deckid)}
      onChange={(e) => props.setActiveDeck({src: 'my', deckid: e.value})}
    />
  );
}

export default DeckSelectMy;
