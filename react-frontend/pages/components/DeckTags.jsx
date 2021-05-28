import React, { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import X from '../../assets/images/icons/x.svg';
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

  const NoOptionsMessage = (props) => {
    return <div className="d-flex justify-content-center">Enter new tag</div>;
  };

  return (
    <CreatableSelect
      classNamePrefix="react-select-tags"
      isMulti
      isClearable={false}
      options={props.defaultTagsOptions}
      onChange={handleChange}
      defaultValue={tags}
      placeholder={false}
      components={{ NoOptionsMessage }}
    />
  );
}

export default DeckTags;
