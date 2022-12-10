import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import At from 'assets/images/icons/at.svg';
import { deckStore, useApp } from 'context';

const DeckSelectMy = ({ deckid, handleSelect }) => {
  const { inventoryMode, isMobile, isWide } = useApp();
  const decks = useSnapshot(deckStore).decks;

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const options = useMemo(() => {
    return Object.keys(decks)
      .filter((i) => !decks[i].master && !decks[i].isHidden)
      .map((i) => {
        const diffDays = Math.round(
          (new Date() - new Date(decks[i]['timestamp'])) / (1000 * 60 * 60 * 24)
        );

        let lastEdit;
        if (diffDays > 90) {
          lastEdit = new Date(decks[i]['timestamp']).toISOString().slice(0, 10);
        } else if (diffDays > 30) {
          lastEdit = `${Math.round(diffDays / 30)}mo`;
        } else if (diffDays > 5) {
          lastEdit = `${Math.round(diffDays / 7)}wk`;
        } else if (diffDays >= 1) {
          lastEdit = `${diffDays}d`;
        }

        return [
          {
            value: i,
            label: (
              <div className="flex items-center justify-between">
                <div className="inline truncate">
                  {decks[i]['name'].slice(
                    0,
                    inventoryMode ? (isWide ? 28 : 23) : 32
                  )}
                </div>
                <div className="pl-2 flex items-center text-xs">
                  {inventoryMode && (
                    <div className="pr-2">
                      {decks[i].inventoryType == 's' && <Shuffle />}
                      {decks[i].inventoryType == 'h' && <PinAngleFill />}
                      {!decks[i].inventoryType && <At />}
                    </div>
                  )}
                  {lastEdit}
                </div>
              </div>
            ),
          },
          decks[i]['timestamp'],
        ];
      })
      .sort(byTimestamp)
      .map((i) => i[0]);
  }, [decks, inventoryMode]);

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children;
    if (name) {
      return name.toLowerCase().includes(string.toLowerCase());
    } else {
      return true;
    }
  };

  const getValue = () => {
    if (decks[deckid]) {
      const v = options.find((obj) => {
        if (decks[deckid].master) {
          return obj.value === decks[deckid].master;
        } else {
          return obj.value === deckid;
        }
      });

      if (v) {
        return v;
      } else {
        return {
          value: deckid,
          label: (
            <div className="flex items-center justify-between">
              <div className="inline truncate">{decks[deckid]['name']}</div>
              <div className="pl-2 flex items-center text-xs">
                {inventoryMode && (
                  <div className="pr-2">
                    {decks[deckid].inventoryType == 's' && <Shuffle />}
                    {decks[deckid].inventoryType == 'h' && <PinAngleFill />}
                    {!decks[deckid].inventoryType && <At />}
                  </div>
                )}
                {new Date(decks[deckid]['timestamp'])
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
      onChange={handleSelect}
    />
  );
};

export default DeckSelectMy;
