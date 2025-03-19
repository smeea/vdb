import { useSnapshot } from 'valtio';
import { DECKS, TAGS } from '@/constants';
import { deckStore } from '@/context';

const DeckSelectAdvTotal = ({ tagsFilter, setTagsFilter }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const byTags = {};
  let total = 0;

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    }
  };

  Object.values(decks).map((deck) => {
    if (deck[TAGS]) {
      deck[TAGS].map((tag) => {
        if (byTags[tag]) {
          byTags[tag] += 1;
        } else {
          byTags[tag] = 1;
        }
      });
      total += 1;
    }
  });

  return (
    <div className="bg-bgSecondary dark:bg-bgSecondaryDark flex items-center justify-between">
      <div className="font-bold whitespace-nowrap">TOTAL: {total}</div>
      <div>
        {Object.keys(byTags).map((k) => {
          return (
            <span key={k} onClick={() => handleClick(k)} className="inline-block whitespace-nowrap">
              <span className="text-fgSecondary dark:text-fgSecondaryDark font-bold">{k}:</span>
              {byTags[k]}
            </span>
          );
        })}
      </div>
      <div />
    </div>
  );
};

export default DeckSelectAdvTotal;
