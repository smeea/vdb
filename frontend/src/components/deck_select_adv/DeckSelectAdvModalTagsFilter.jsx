import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';

const DeckSelectAdvModalTagsFilter = ({
  tagsFilter,
  handleChangeTagsFilter,
  allTagsOptions,
}) => {
  const { isMobile } = useApp();

  const tags = tagsFilter
    ? tagsFilter.map((tag) => ({
        label: tag,
        value: tag,
      }))
    : undefined;

  return (
    <Select
      classNamePrefix="tags-bordered react-select-tags"
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
