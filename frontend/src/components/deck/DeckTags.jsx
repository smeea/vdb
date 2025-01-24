import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import Spellcheck from '@icons/spellcheck.svg?react';
import { Select, ButtonIconed } from '@/components';
import { deckUpdate } from '@/context';
import { getTags, getIsEditable } from '@/utils';
import { SUPERIOR, BASE, DECKID, CRYPT, LIBRARY, TAGS } from '@/constants';

const DeckTags = ({ deck, noAutotags, isBordered, allTagsOptions }) => {
  const isEditable = getIsEditable(deck);

  const tagList = useMemo(() => {
    const t = [];

    if (deck[TAGS]) {
      if (deck[TAGS][BASE] && deck[TAGS][SUPERIOR]) {
        deck[TAGS][SUPERIOR].forEach((tag) => {
          t.push({
            label: <b>{tag}</b>,
            value: tag,
          });
        });
        deck[TAGS][BASE].forEach((tag) => {
          t.push({
            label: tag,
            value: tag,
          });
        });
      } else {
        deck[TAGS].forEach((tag) => {
          t.push({
            label: tag,
            value: tag,
          });
        });
      }
    }

    return t;
  }, [deck[TAGS]]);

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
        variant="creatable"
        className="w-full"
        noBorder={!isBordered}
        noRemove={!isEditable}
        isMulti
        isDisabled={!isEditable}
        options={options}
        onChange={handleChange}
        value={tagList}
        placeholder="Click to add tags"
        noOptionsMessage={() => 'Enter new tag'}
        roundedStyle={twMerge('rounded-sm', isEditable && 'rounded-r-none')}
        borderStyle={isEditable ? 'border-y border-l border-r-none' : 'border'}
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
