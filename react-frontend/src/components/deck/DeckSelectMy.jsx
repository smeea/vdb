import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import At from 'assets/images/icons/at.svg';
import { useApp } from 'context';

const DeckSelectMy = (props) => {
  const { inventoryMode, setActiveDeck, decks, isMobile } = useApp();
  const [options, setOptions] = useState([]);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  useEffect(() => {
    const preOptions = Object.keys(decks)
      .filter((i) => !decks[i].master)
      .filter((i) => !decks[i].hidden)
      .map((i, index) => {
        const diffDays = Math.round(
          (new Date() - new Date(decks[i]['timestamp'])) / (1000 * 60 * 60 * 24)
        );

        let lastEdit;
        if (diffDays > 90) {
          lastEdit = new Date(decks[i]['timestamp']).toISOString().slice(0, 10);
        } else if (diffDays > 30) {
          lastEdit = `${Math.round(diffDays / 30)}m`;
        } else if (diffDays > 5) {
          lastEdit = `${Math.round(diffDays / 7)}w`;
        } else if (diffDays >= 1) {
          lastEdit = `${diffDays}d`;
        }

        return [
          {
            value: i,
            label: (
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-inline trimmed">
                  {decks[i]['name'].slice(0, 32)}
                </div>
                <div className="d-flex align-items-center ps-2 small">
                  {inventoryMode && (
                    <div className="pe-2">
                      {decks[i].inventory_type == 's' && <Shuffle />}
                      {decks[i].inventory_type == 'h' && <PinAngleFill />}
                      {!decks[i].inventory_type && <At />}
                    </div>
                  )}
                  {lastEdit}
                </div>
              </div>
            ),
          },
          decks[i]['timestamp'],
        ];
      });

    setOptions(
      preOptions.sort(byTimestamp).map((i, index) => {
        return i[0];
      })
    );
  }, [inventoryMode, decks]);

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children;
    if (name) {
      return name.toLowerCase().includes(string.toLowerCase());
    } else {
      return true;
    }
  };

  const getValue = () => {
    if (decks[props.deckid]) {
      const v = options.find((obj) => {
        if (decks[props.deckid].master) {
          return obj.value === decks[props.deckid].master;
        } else {
          return obj.value === props.deckid;
        }
      });

      if (v) {
        return v;
      } else {
        return {
          value: props.deckid,
          label: (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-inline trimmed">
                {decks[props.deckid]['name']}
              </div>
              <div className="d-flex align-items-center ps-2 small">
                {inventoryMode && (
                  <div className="pe-2">
                    {decks[props.deckid].inventory_type == 's' && <Shuffle />}
                    {decks[props.deckid].inventory_type == 'h' && (
                      <PinAngleFill />
                    )}
                    {!decks[props.deckid].inventory_type && <At />}
                  </div>
                )}
                {new Date(decks[props.deckid]['timestamp'])
                  .toISOString()
                  .slice(0, 10)}
              </div>
            </div>
          ),
        };
      }
    }
  };

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={!isMobile}
      filterOption={filterOption}
      name="decks"
      maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
      placeholder="Select Deck"
      value={getValue()}
      onChange={(e) => {
        props.setActiveDeck
          ? props.setActiveDeck({ src: 'my', deckid: e.value })
          : setActiveDeck({ src: 'my', deckid: e.value });
      }}
    />
  );
};

export default DeckSelectMy;
