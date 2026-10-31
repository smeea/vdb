import { twMerge } from "tailwind-merge";
import { DeckSortButton, Header } from "@/components";
import { TAGS } from "@/constants";
import { useApp } from "@/context";

const DeckSelectAdvTotal = ({
  decks = {},
  sortMethod,
  setSortMethod,
  tagsFilter,
  setTagsFilter,
}) => {
  const { isMobile } = useApp();
  const byTags = {};

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((i) => i !== tag));
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
    }
  });

  return (
    <Header
      className={twMerge(
        "sm:space-x-2",
        isMobile && Object.keys(byTags).length > 10 ? "block" : "flex",
      )}
    >
      <div className="p-1 p-2 font-bold whitespace-nowrap max-sm:hidden">
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
                className="inline-block cursor-pointer px-2 whitespace-nowrap"
              >
                <div className="text-fgSecondary dark:text-fgSecondaryDark inline pr-0.5 font-bold">
                  {i}:
                </div>
                {byTags[i]}
              </div>
            );
          })}
      </div>
      <div className="flex justify-between sm:justify-end">
        <div className="p-1 p-2 font-bold whitespace-nowrap sm:hidden">
          TOTAL: {Object.keys(decks).length}
        </div>
        <DeckSortButton sortMethod={sortMethod} onChange={setSortMethod} />
      </div>
    </Header>
  );
};

export default DeckSelectAdvTotal;
