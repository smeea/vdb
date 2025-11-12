import Spellcheck from "@icons/spellcheck.svg?react";
import { twMerge } from "tailwind-merge";
import { ButtonIconed, Select } from "@/components";
import { BASE, CRYPT, DECKID, LIBRARY, SUPERIOR, TAGS } from "@/constants";
import { deckUpdate } from "@/context";
import { getIsEditable, getTags } from "@/utils";

const DeckTags = ({
  deck,
  noAutotags,
  justifyRight,
  isNonEditable,
  isBordered,
  noBackground,
  allTagsOptions,
}) => {
  const isEditable = isNonEditable ? false : getIsEditable(deck);
  const tagList = [];

  if (deck[TAGS]) {
    if (deck[TAGS][BASE] && deck[TAGS][SUPERIOR]) {
      deck[TAGS][SUPERIOR].forEach((tag) => {
        tagList.push({
          label: <b>{tag}</b>,
          value: tag,
        });
      });
      deck[TAGS][BASE].forEach((tag) => {
        tagList.push({
          label: tag,
          value: tag,
        });
      });
    } else {
      deck[TAGS].forEach((tag) => {
        tagList.push({
          label: tag,
          value: tag,
        });
      });
    }
  }

  const handleChange = (event) => {
    const v = event.map((t) => t.value);
    deckUpdate(deck[DECKID], TAGS, v);
  };

  const handleAutotagClick = () => {
    const tags = getTags(deck[CRYPT], deck[LIBRARY]);
    deckUpdate(deck[DECKID], TAGS, [...tags[SUPERIOR], ...tags[BASE]]);
  };

  const options = allTagsOptions.map((tag) => {
    return {
      value: tag,
      label: tag,
    };
  });

  return (
    <div className="flex">
      <Select
        borderStyle={isEditable && !noAutotags ? "border-y border-l border-r-none" : "border"}
        className="w-full"
        isDisabled={!isEditable}
        isSearchable
        isMulti
        noBackground={noBackground}
        noBorder={!isBordered}
        noOptionsMessage={() => "Enter new tag"}
        noRemove={!isEditable}
        onChange={handleChange}
        options={options}
        placeholder={isEditable && "Click to add tags"}
        roundedStyle={twMerge("rounded-sm", isEditable && !noAutotags && "rounded-r-none")}
        value={tagList}
        variant="creatable"
        justifyRight={justifyRight}
        noDropdown
      />
      {!noAutotags && isEditable && (
        <ButtonIconed
          className="rounded-l-none"
          onClick={handleAutotagClick}
          title="Autotag Deck"
          icon={<Spellcheck width="22" height="24" viewBox="0 0 16 16" />}
        />
      )}
    </div>
  );
};

export default DeckTags;
