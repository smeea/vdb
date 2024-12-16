import { useMemo } from 'react';
import { TAGS } from '@/constants';

const useDecksTagsAll = (decks) => {
  return useMemo(() => {
    const allTags = new Set();

    if (decks) {
      Object.keys(decks).forEach((id) => {
        if (decks[id][TAGS]) {
          decks[id][TAGS].forEach((tag) => {
            allTags.add(tag);
          });
        }
      });
    }

    return [...allTags];
  }, [decks]);
};

export default useDecksTagsAll;
