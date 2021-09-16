import React, { useEffect, useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import AppContext from '../../context/AppContext';

function DeckTags(props) {
  const { deckUpdate, isMobile } = useContext(AppContext);
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

  return (
    <CreatableSelect
      classNamePrefix={
        props.bordered ? 'bordered react-select-tags' : 'react-select-tags'
      }
      isMulti
      isClearable={false}
      options={props.allTagsOptions}
      onChange={handleChange}
      value={tags}
      placeholder="click to add tag"
    />
  );
}

export default DeckTags;
