import React, { useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import AppContext from '../../context/AppContext';

function DeckTags(props) {
  const { deckUpdate, isMobile } = useContext(AppContext);

  const setTags = (tags) => deckUpdate(props.deck.deckid, 'setTags', tags);

  const handleChange = (event) => {
    const tags = event.map((t) => t.value);
    setTags(tags);
  };

  const tags = props.deck.tags.map((tag) => ({
    label: tag,
    value: tag,
  }));

  return (
    <CreatableSelect
      classNamePrefix="react-select-tags"
      isMulti
      isClearable={false}
      options={props.defaultTagsOptions}
      onChange={handleChange}
      defaultValue={tags}
      placeholder={false}
    />
  );
}

export default DeckTags;
