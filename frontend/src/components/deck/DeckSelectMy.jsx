import At from "@icons/at.svg?react";
import PinAngleFill from "@icons/pin-angle-fill.svg?react";
import Shuffle from "@icons/shuffle.svg?react";
import { format, differenceInDays } from "date-fns";
import { useSnapshot } from "valtio";
import paths from "@/assets/data/paths.json";
import { ResultLegalIcon, ResultPathImage, ResultPreconClan, Select } from "@/components";
import {
  BANNED,
  CRYPT,
  CUSTOM,
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
  TAGS,
  TIMESTAMP,
} from "@/constants";
import { deckStore, limitedStore, useApp } from "@/context";
import { byTimestamp, getClan, getRestrictions } from "@/utils";

const DeckSelectMy = ({ deckid, handleSelect }) => {
  const { limitedOnlyDecks, limitedPreset, limitedMode, inventoryMode, isMobile, isWide } =
    useApp();
  const decks = useSnapshot(deckStore)[DECKS];

  const options = Object.keys(decks ?? {})
    .filter((i) => !decks[i][MASTER] && !decks[i][IS_HIDDEN])
    .filter((i) => {
      if (limitedMode && limitedOnlyDecks && limitedPreset !== CUSTOM) {
        if (!decks[i][TAGS].includes(limitedPreset.toUpperCase())) return false;
      }
      return true;
    })
    .toSorted((a, b) => byTimestamp(decks[a], decks[b]))
    .map((i, idx) => {
      const diffDays = differenceInDays(new Date(), decks[i][TIMESTAMP]);

      let lastEdit;
      if (diffDays > 90) {
        lastEdit = format(decks[i][TIMESTAMP], "yyyy-MM-dd");
      } else if (diffDays > 30) {
        lastEdit = `${Math.round(diffDays / 30)}mo`;
      } else if (diffDays > 5) {
        lastEdit = `${Math.round(diffDays / 7)}wk`;
      } else if (diffDays >= 1) {
        lastEdit = `${diffDays}d`;
      }

      const clan = getClan(decks[i][CRYPT]);

      const restrictions =
        idx < 15 || diffDays < 90
          ? getRestrictions(
              decks[i],
              limitedMode
                ? {
                    [CRYPT]: limitedStore[CRYPT],
                    [LIBRARY]: limitedStore[LIBRARY],
                  }
                : null,
            )
          : {};

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

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children[1].props.children;
    if (name) return name.toLowerCase().includes(string.toLowerCase());
    return true;
  };

  const value = options.find((obj) => {
    return decks?.[deckid]?.[MASTER]
      ? obj.value === decks?.[deckid]?.[MASTER]
      : obj.value === deckid;
  });

  return (
    <Select
      options={options}
      isSearchable={!isMobile}
      filterOption={filterOption}
      maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
      placeholder="Select Deck"
      value={value}
      onChange={handleSelect}
    />
  );
};

export default DeckSelectMy;
