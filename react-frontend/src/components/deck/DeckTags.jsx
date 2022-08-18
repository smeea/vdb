import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useApp } from 'context';

const DeckTags = ({
  deckid,
  tags,
  bordered,
  isAuthor,
  isPublic,
  allTagsOptions,
}) => {
  const { deckUpdate } = useApp();
  const tagList = useMemo(
    () =>
      tags
        ? tags.map((tag) => ({
            label: tag,
            value: tag,
          }))
        : undefined,
    [tags]
  );

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
