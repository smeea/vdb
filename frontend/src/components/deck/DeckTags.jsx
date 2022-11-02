import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import { deckUpdate } from 'context';

const DeckTags = ({ deck, tagsSuperior, bordered, allTagsOptions }) => {
  const { deckid, tags, isPublic, isAuthor } = deck;

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
    <div className="form-placeholder gray">Click to add tags</div>
  );
  const noOptionsMessage = () => 'Enter new tag';

  let classNamePrefix = 'react-select-tags';
  if (bordered) {
    classNamePrefix = 'bordered ' + classNamePrefix;
  }
  if (!isAuthor) {
    classNamePrefix = 'tags-no-remove ' + classNamePrefix;
  }

  return (
    <CreatableSelect
      classNamePrefix={classNamePrefix}
      isMulti
      isDisabled={!isAuthor || isPublic}
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
