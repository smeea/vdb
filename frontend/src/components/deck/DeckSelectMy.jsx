import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Shuffle from '@/assets/images/icons/shuffle.svg?react';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg?react';
import At from '@/assets/images/icons/at.svg?react';
import { Select, ResultPreconClan, ResultLegalIcon } from '@/components';
import { limitedStore, deckStore, useApp } from '@/context';
import { getRestrictions, getClan } from '@/utils';
import { INVENTORY_TYPE, DECKS, BANNED, LEGAL, PLAYTEST } from '@/utils/constants';

const DeckSelectMy = ({ deckid, handleSelect }) => {
  const { limitedMode, inventoryMode, isMobile, isWide } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const limitedCards = useSnapshot(limitedStore);

  const byTimestamp = (a, b) => {
    return new Date(decks[b].timestamp) - new Date(decks[a].timestamp);
  };

  const options = useMemo(() => {
    return Object.keys(decks)
      .filter((i) => !decks[i].master && !decks[i].isHidden)
      .toSorted(byTimestamp)
      .map((i, idx) => {
        const diffDays = Math.round(
          (new Date() - new Date(decks[i]['timestamp'])) / (1000 * 60 * 60 * 24),
        );

        let lastEdit;
        if (diffDays > 90) {
          lastEdit = new Date(decks[i]['timestamp']).toISOString().split('T')[0];
        } else if (diffDays > 30) {
          lastEdit = `${Math.round(diffDays / 30)}mo`;
        } else if (diffDays > 5) {
          lastEdit = `${Math.round(diffDays / 7)}wk`;
        } else if (diffDays >= 1) {
          lastEdit = `${diffDays}d`;
        }

        const clan = getClan(decks[i].crypt);

        let hasBanned;
        let hasLimited;
        let hasPlaytest;
        let hasIllegalDate;
        if (idx < 15 || diffDays < 90) {
          ({ hasBanned, hasLimited, hasPlaytest, hasIllegalDate } = getRestrictions(
            decks[i],
            limitedCards,
          ));
        }

        return {
          value: i,
          label: (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex w-[40px] items-center justify-center">
                  {clan && <ResultPreconClan clan={clan} />}
                </div>
                <div className="inline">
                  {decks[i]['name'].slice(0, inventoryMode ? (isWide ? 28 : 23) : 32)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-end gap-2">
                  {hasBanned && <ResultLegalIcon type={BANNED} />}
                  {limitedMode && hasLimited && <ResultLegalIcon />}
                  {hasPlaytest && <ResultLegalIcon type={PLAYTEST} />}
                  {hasIllegalDate && <ResultLegalIcon type={LEGAL} value={hasIllegalDate} />}
                </div>
                {inventoryMode && (
                  <div>
                    {decks[i][INVENTORY_TYPE] == 's' && <Shuffle />}
                    {decks[i][INVENTORY_TYPE] == 'h' && <PinAngleFill />}
                    {!decks[i][INVENTORY_TYPE] && <At />}
                  </div>
                )}
                <div className="text-sm">{lastEdit}</div>
              </div>
            </div>
          ),
        };
      });
  }, [decks, inventoryMode]);

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children[1].props.children;
    if (name) {
      return name.toLowerCase().includes(string.toLowerCase());
    }
    return true;
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
              <div className="inline">{decks[deckid].name}</div>
              <div className="flex items-center gap-1">
                {inventoryMode && (
                  <div>
                    {decks[deckid][INVENTORY_TYPE] == 's' && <Shuffle />}
                    {decks[deckid][INVENTORY_TYPE] == 'h' && <PinAngleFill />}
                    {!decks[deckid][INVENTORY_TYPE] && <At />}
                  </div>
                )}
                <div className="text-sm">
                  {new Date(decks[deckid]['timestamp']).toISOString().split('T')[0]}
                </div>
              </div>
            </div>
          ),
        };
      }
    }
  };

  return (
    <Select
      options={options}
      isSearchable={!isMobile}
      filterOption={filterOption}
      maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
      placeholder="Select Deck"
      value={getValue()}
      onChange={handleSelect}
    />
  );
};

export default DeckSelectMy;
