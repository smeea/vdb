import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useApp } from 'context';

const DeckTags = ({ deck, bordered, isAuthor, allTagsOptions }) => {
  const { deckUpdate } = useApp();
  const [tags, setTags] = useState(undefined);

  const handleChange = (event) => {
    const v = event.map((t) => t.value);
    deckUpdate(deck.deckid, 'tags', v);
  };

  useEffect(() => {
    if (deck.tags) {
      setTags(
        deck.tags.map((tag) => ({
          label: tag,
          value: tag,
        }))
      );
    } else {
      setTags(undefined);
    }
  }, [deck]);

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
      isDisabled={!isAuthor}
      isClearable={false}
      options={allTagsOptions}
      onChange={handleChange}
      value={tags}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default DeckTags;
