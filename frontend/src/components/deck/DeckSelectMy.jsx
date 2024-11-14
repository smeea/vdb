import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Shuffle from '@/assets/images/icons/shuffle.svg?react';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg?react';
import At from '@/assets/images/icons/at.svg?react';
import { Select, ResultPreconClan, ResultLegalIcon } from '@/components';
import { limitedStore, deckStore, useApp } from '@/context';
import { getRestrictions, getClan } from '@/utils';
import {
  BANNED,
  CRYPT,
  DECKS,
  H,
  HAS_BANNED,
  HAS_ILLEGAL_DATE,
  HAS_LIMITED,
  HAS_PLAYTEST,
  INVENTORY_TYPE,
  IS_HIDDEN,
  LEGAL,
  MASTER,
  NAME,
  PLAYTEST,
  S,
  TIMESTAMP,
} from '@/constants';

const DeckSelectMy = ({ deckid, handleSelect }) => {
  const { limitedMode, inventoryMode, isMobile, isWide } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const limitedCards = useSnapshot(limitedStore);

  const byTimestamp = (a, b) => {
    return new Date(decks[b][TIMESTAMP]) - new Date(decks[a][TIMESTAMP]);
  };

  const options = useMemo(() => {
    return Object.keys(decks)
      .filter((i) => !decks[i][MASTER] && !decks[i][IS_HIDDEN])
      .toSorted(byTimestamp)
      .map((i, idx) => {
        const diffDays = Math.round(
          (new Date() - new Date(decks[i][TIMESTAMP])) / (1000 * 60 * 60 * 24),
        );

        let lastEdit;
        if (diffDays > 90) {
          lastEdit = new Date(decks[i][TIMESTAMP]).toISOString().split('T')[0];
        } else if (diffDays > 30) {
          lastEdit = `${Math.round(diffDays / 30)}mo`;
        } else if (diffDays > 5) {
          lastEdit = `${Math.round(diffDays / 7)}wk`;
        } else if (diffDays >= 1) {
          lastEdit = `${diffDays}d`;
        }

        const clan = getClan(decks[i][CRYPT]);

        let hasBanned;
        let hasLimited;
        let hasPlaytest;
        let hasIllegalDate;
        if (idx < 15 || diffDays < 90) {
          ({
            [HAS_BANNED]: hasBanned,
            [HAS_LIMITED]: hasLimited,
            [HAS_PLAYTEST]: hasPlaytest,
            [HAS_ILLEGAL_DATE]: hasIllegalDate,
          } = getRestrictions(decks[i], limitedMode ? limitedCards : null));
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
                  {decks[i][NAME].slice(0, inventoryMode ? (isWide ? 28 : 23) : 32)}
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
                    {decks[i][INVENTORY_TYPE] == S && <Shuffle />}
                    {decks[i][INVENTORY_TYPE] == H && <PinAngleFill />}
                    {!decks[i][INVENTORY_TYPE] && <At />}
                  </div>
                )}
                <div className="text-sm">{lastEdit}</div>
              </div>
            </div>
          ),
        };
      });
  }, [decks, limitedMode, inventoryMode]);

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
        if (decks[deckid][MASTER]) {
          return obj.value === decks[deckid][MASTER];
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
              <div className="inline">{decks[deckid][NAME]}</div>
              <div className="flex items-center gap-1">
                {inventoryMode && (
                  <div>
                    {decks[deckid][INVENTORY_TYPE] == S && <Shuffle />}
                    {decks[deckid][INVENTORY_TYPE] == H && <PinAngleFill />}
                    {!decks[deckid][INVENTORY_TYPE] && <At />}
                  </div>
                )}
                <div className="text-sm">
                  {new Date(decks[deckid][TIMESTAMP]).toISOString().split('T')[0]}
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
