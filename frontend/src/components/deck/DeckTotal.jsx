import { useSnapshot } from "valtio";
import { DECKS, TAGS } from "@/constants";
import { deckStore } from "@/context";

const DeckSelectAdvTotal = ({ tagsFilter, setTagsFilter }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const byTags = {};
  let total = 0;

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    }
  };

  Object.values(decks).forEach((deck) => {
    if (deck[TAGS]) {
      deck[TAGS].forEach((tag) => {
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
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      <div className="whitespace-nowrap font-bold">TOTAL: {total}</div>
      <div>
        {Object.keys(byTags).map((k) => {
          return (
            <span key={k} onClick={() => handleClick(k)} className="inline-block whitespace-nowrap">
              <span className="font-bold text-fgSecondary dark:text-fgSecondaryDark">{k}:</span>
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
