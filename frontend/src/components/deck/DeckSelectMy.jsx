import paths from "@/assets/data/paths.json";
import { ResultLegalIcon, ResultPathImage, ResultPreconClan, Select } from "@/components";
import {
  BANNED,
  CRYPT,
  DECKS,
  H,
  HAS_BANNED,
  HAS_LIMITED,
  HAS_PLAYTEST,
  INVENTORY_TYPE,
  IS_HIDDEN,
  LIBRARY,
  MASTER,
  NAME,
  PLAYTEST,
  S,
  TIMESTAMP,
} from "@/constants";
import { deckStore, limitedStore, useApp } from "@/context";
import { byTimestamp, getClan, getRestrictions } from "@/utils";
import At from "@icons/at.svg?react";
import PinAngleFill from "@icons/pin-angle-fill.svg?react";
import Shuffle from "@icons/shuffle.svg?react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useSnapshot } from "valtio";

const DeckSelectMy = ({ deckid, handleSelect }) => {
  const { limitedMode, inventoryMode, isMobile, isWide } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];

  const options = useMemo(() => {
    return Object.keys(decks)
      .filter((i) => !decks[i][MASTER] && !decks[i][IS_HIDDEN])
      .toSorted((a, b) => byTimestamp(decks[a], decks[b]))
      .map((i, idx) => {
        const diffDays = dayjs().diff(dayjs(decks[i][TIMESTAMP]), "day");

        let lastEdit;
        if (diffDays > 90) {
          lastEdit = dayjs(decks[i][TIMESTAMP]).format("YYYY-MM-DD");
        } else if (diffDays > 30) {
          lastEdit = `${Math.round(diffDays / 30)}mo`;
        } else if (diffDays > 5) {
          lastEdit = `${Math.round(diffDays / 7)}wk`;
        } else if (diffDays >= 1) {
          lastEdit = `${diffDays}d`;
        }

        const clan = getClan(decks[i][CRYPT]);

        let restrictions = {};
        if (idx < 15 || diffDays < 90) {
          restrictions = getRestrictions(
            decks[i],
            limitedMode ? { [CRYPT]: limitedStore[CRYPT], [LIBRARY]: limitedStore[LIBRARY] } : null,
          );
        }

        return {
          value: i,
          label: (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex w-[35px] items-center justify-center pr-1">
                  {clan &&
                    (paths.includes(clan) ? (
                      <ResultPathImage value={clan} />
                    ) : (
                      <ResultPreconClan clan={clan} />
                    ))}
                </div>
                <div className="inline">
                  {decks[i][NAME].slice(0, inventoryMode ? (isWide ? 28 : 23) : 32)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-end gap-2">
                  {restrictions[HAS_BANNED] && <ResultLegalIcon type={BANNED} />}
                  {restrictions[HAS_LIMITED] && limitedMode && <ResultLegalIcon />}
                  {restrictions[HAS_PLAYTEST] && <ResultLegalIcon type={PLAYTEST} />}
                </div>
                {inventoryMode && (
                  <div>
                    {decks[i][INVENTORY_TYPE] === S && <Shuffle />}
                    {decks[i][INVENTORY_TYPE] === H && <PinAngleFill />}
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
    if (name) return name.toLowerCase().includes(string.toLowerCase());
    return true;
  };

  const getValue = () => {
    if (decks[deckid]) {
      const v = options.find((obj) => {
        if (decks[deckid][MASTER]) {
          return obj.value === decks[deckid][MASTER];
        }
        return obj.value === deckid;
      });

      if (v) {
        return v;
      }
      return {
        value: deckid,
        label: (
          <div className="flex items-center justify-between">
            <div className="inline">{decks[deckid][NAME]}</div>
            <div className="flex items-center gap-1">
              {inventoryMode && (
                <div>
                  {decks[deckid][INVENTORY_TYPE] === S && <Shuffle />}
                  {decks[deckid][INVENTORY_TYPE] === H && <PinAngleFill />}
                  {!decks[deckid][INVENTORY_TYPE] && <At />}
                </div>
              )}
              <div className="text-sm">{dayjs(decks[deckid][TIMESTAMP]).format("YYYY-MM-DD")}</div>
            </div>
          </div>
        ),
      };
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
