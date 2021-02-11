import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Diagram3Fill from '../../assets/images/icons/diagram-3-fill.svg'
import LockFill from '../../assets/images/icons/lock-fill.svg'
import Moon from '../../assets/images/icons/moon.svg';

function DeckSelect(props) {
  const [state, setState] = useState(props.decks);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const decksPreOptions = Object.keys(state).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            {state[i]['name']}
            <div className="d-flex align-items-center pl-2 small">
              {props.inventoryMode &&
               <div className="pr-2">
                 {state[i].inventory_type == 's' &&
                  <Diagram3Fill/>
                 }
                 {state[i].inventory_type == 'h' &&
                  <LockFill/>
                 }
                 {!state[i].inventory_type &&
                  <Moon/>
                 }
               </div>
              }
              {new Date(state[i]['timestamp']).toISOString().slice(0, 10)}
            </div>
          </div>
        ),
      },
      state[i]['timestamp'],
    ];
  });

  const decksOptions = decksPreOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  useEffect(() => {
    setState(props.decks);
  }, [props.decks]);

  return (
    <Select
      options={decksOptions}
      isSearchable={false}
      name="decks"
      placeholder="Select Deck"
      value={decksOptions.find((obj) => obj.value === props.activeDeck)}
      onChange={(e) => {
        if (e.value) {
          props.setActiveDeck(e.value);
        } else {
          props.setActiveDeck(undefined);
        }
      }}
    />
  );
}

export default DeckSelect;
