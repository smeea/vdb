import { DeckSortButton, Header } from "@/components";
import { DECKS, TAGS } from "@/constants";
import { deckStore, useApp } from "@/context";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";

const DeckSelectAdvTotal = ({ sortMethod, setSortMethod, tagsFilter, setTagsFilter }) => {
  const { isMobile } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const byTags = {};

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((i) => i !== tag));
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
    }
  });

  return (
    <Header
      className={twMerge(
        "sm:space-x-2",
        isMobile && Object.keys(byTags).length > 10 ? "block" : "flex",
      )}
    >
      <div className="whitespace-nowrap p-1 font-bold sm:p-2">
        TOTAL: {Object.keys(decks).length}
      </div>
      <div>
        {Object.keys(byTags)
          .toSorted()
          .map((i) => {
            return (
              <div
                key={i}
                onClick={() => handleClick(i)}
                className="inline-block cursor-pointer whitespace-nowrap px-2"
              >
                <div className="inline pr-0.5 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                  {i}:
                </div>
                {byTags[i]}
              </div>
            );
          })}
      </div>
      <div className="flex justify-end">
        <DeckSortButton sortMethod={sortMethod} onChange={setSortMethod} />
      </div>
    </Header>
  );
};

export default DeckSelectAdvTotal;
