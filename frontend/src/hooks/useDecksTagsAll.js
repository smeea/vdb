import { useMemo } from "react";
import { TAGS, TWO_P, V5 } from "@/constants";
import { useApp } from "@/context";

const V5u = V5.toUpperCase();
const TWO_Pu = TWO_P.toUpperCase();

const sort = (a, b) => {
  if (b === V5u) return 1;
  if (a === V5u) return -1;
  if (b === TWO_Pu) return 1;
  if (a === TWO_Pu) return -1;

  return a.localeCompare(b);
};

const useDecksTagsAll = (decks) => {
  const { limitedPreset, limitedMode } = useApp();

  return useMemo(() => {
    if (!decks) return [];
    const allTags = new Set();

    if (limitedMode && limitedPreset === V5) allTags.add(V5u);
    if (limitedMode && limitedPreset === TWO_P) allTags.add(TWO_Pu);

    Object.keys(decks).forEach((id) => {
      if (decks[id][TAGS].includes(V5u)) allTags.add(V5u);
      if (decks[id][TAGS].includes(TWO_Pu)) allTags.add(TWO_Pu);

      decks[id][TAGS].forEach((tag) => {
        allTags.add(tag);
      });
    });

    return [...allTags].toSorted(sort);
  }, [decks, limitedMode, limitedPreset]);
};

export default useDecksTagsAll;
