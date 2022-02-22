import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const DeckSelectAdvModalTagsFilter = ({
  tagsFilter,
  handleChangeTagsFilter,
  allTagsOptions,
}) => {
  const { isMobile } = useApp();

  const [tags, setTags] = useState(undefined);

  useEffect(() => {
    if (tagsFilter) {
      setTags(
        tagsFilter.map((tag) => ({
          label: tag,
          value: tag,
        }))
      );
    } else {
      setTags(undefined);
    }
  }, [tagsFilter]);

  return (
    <Select
      classNamePrefix="tags-filter react-select-tags"
      isMulti
      options={allTagsOptions}
      onChange={handleChangeTagsFilter}
      value={tags}
      placeholder="Filter by Tags"
      isSearchable={!isMobile}
    />
  );
};

export default DeckSelectAdvModalTagsFilter;
