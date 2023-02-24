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

  const placeholder = (
    <div className="text-midGray dark:text-midGrayDark">Click to add tags</div>
  );
  const noOptionsMessage = () => 'Enter new tag';

  return (
    <SelectCreatable
      noBorder={!isBordered}
      noRemove={!isEditable}
      isMulti
      isDisabled={!isEditable}
      options={allTagsOptions}
      onChange={handleChange}
      value={tagList}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default DeckTags;
