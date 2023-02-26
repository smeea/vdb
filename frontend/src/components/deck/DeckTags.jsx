import React, { useMemo } from 'react';
import { SelectCreatable } from '@/components';
import { deckUpdate } from '@/context';

const DeckTags = ({ deck, tagsSuperior, isBordered, allTagsOptions }) => {
  const { deckid, tags, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const tagList = useMemo(() => {
    const t = [];
    if (tagsSuperior) {
      tagsSuperior.map((tag) => {
        t.push({
          label: <b>{tag}</b>,
          value: tag,
        });
      });
    }

    if (tags) {
      tags.map((tag) => {
        t.push({
          label: tag,
          value: tag,
        });
      });
    }

    return t;
  }, [tags, tagsSuperior]);

  const handleChange = (event) => {
    const v = event.map((t) => t.value);
    deckUpdate(deckid, 'tags', v);
  };

  return (
    <SelectCreatable
      noBorder={!isBordered}
      noRemove={!isEditable}
      isMulti
      isDisabled={!isEditable}
      options={allTagsOptions}
      onChange={handleChange}
      value={tagList}
      placeholder="Click to add tags"
      noOptionsMessage={() => 'Enter new tag'}
    />
  );
};

export default DeckTags;
