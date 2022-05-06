import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useApp } from 'context';

function DeckTags(props) {
  const { deckUpdate } = useApp();
  const [tags, setTags] = useState(undefined);

  const handleChange = (event) => {
    const v = event.map((t) => t.value);
    deckUpdate(props.deck.deckid, 'tags', v);
  };

  useEffect(() => {
    if (props.deck.tags) {
      setTags(
        props.deck.tags.map((tag) => ({
          label: tag,
          value: tag,
        }))
      );
    } else {
      setTags(undefined);
    }
  }, [props.deck]);

  const placeholder = (
    <div className="form-placeholder gray">Click to add tags</div>
  );
  const noOptionsMessage = () => 'Enter new tag';

  let classNamePrefix = 'react-select-tags';
  if (props.bordered) {
    classNamePrefix = 'bordered ' + classNamePrefix;
  }
  if (!props.isAuthor) {
    classNamePrefix = 'tags-no-remove ' + classNamePrefix;
  }

  return (
    <CreatableSelect
      classNamePrefix={classNamePrefix}
      isMulti
      isClearable={false}
      options={props.allTagsOptions}
      onChange={handleChange}
      value={tags}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
}

export default DeckTags;
