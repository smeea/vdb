import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import { deckUpdate } from 'context';

const DeckTags = ({ deck, tagsSuperior, bordered, allTagsOptions }) => {
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
    <div className="text-neutral-500 text-sm">Click to add tags</div>
  );
  const noOptionsMessage = () => 'Enter new tag';

  let classNamePrefix = 'react-select-tags';
  if (bordered) {
    classNamePrefix = 'tags-bordered ' + classNamePrefix;
  }
  if (!isEditable) {
    classNamePrefix = 'tags-no-remove ' + classNamePrefix;
  }

  return (
    <CreatableSelect
      className="w-full"
      classNamePrefix={classNamePrefix}
      isMulti
      isDisabled={!isEditable}
      isClearable={false}
      options={allTagsOptions}
      onChange={handleChange}
      value={tagList}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default DeckTags;
