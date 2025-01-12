import { useMemo } from 'react';
import { TAGS, BASE, SUPERIOR } from '@/constants';

const useDecksTagsAll = (decks) => {
  return useMemo(() => {
    const allTags = new Set();

    // TODO FIX AFTER TAGS FLATTENING ON TWD/PDA COPY
    if (decks) {
      Object.keys(decks).forEach((id) => {
        if (decks[id][TAGS]) {
          if (decks[id][TAGS][BASE] && decks[id][TAGS][SUPERIOR]) {
            [...decks[id][TAGS][BASE], ...decks[id][TAGS][SUPERIOR]].forEach((tag) => {
              allTags.add(tag);
            });
          } else {
            decks[id][TAGS].forEach((tag) => {
              allTags.add(tag);
            });
          }
        }
      });
    }

    return [...allTags];
  }, [decks]);
};

export default useDecksTagsAll;
