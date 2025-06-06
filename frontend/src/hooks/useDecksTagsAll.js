import { TAGS } from "@/constants";
import { useMemo } from "react";

const useDecksTagsAll = (decks) => {
  return useMemo(() => {
    if (!decks) return [];

    const allTags = new Set();
    Object.keys(decks).forEach((id) => {
      decks[id][TAGS].forEach((tag) => {
        allTags.add(tag);
      });
    });

    return [...allTags];
  }, [decks]);
};

export default useDecksTagsAll;
