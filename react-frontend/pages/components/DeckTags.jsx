import React, { useEffect, useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import AppContext from '../../context/AppContext';

function DeckTags(props) {
  const { deckUpdate } = useContext(AppContext);
  const [tags, setTags] = useState(undefined);

  const handleChange = (event) => {
    const v = event.map((t) => t.value);
    deckUpdate(props.deck.deckid, 'setTags', v);
  };

  useEffect(() => {
    if (props.deck.tags) {
      setTags(
        props.deck.tags.map((tag) => ({
          label: tag,
          value: tag,
        }))
      );
    }
  }, [props.deck]);

  const placeholder = <div className="form-placeholder">Click to add tags</div>;
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
