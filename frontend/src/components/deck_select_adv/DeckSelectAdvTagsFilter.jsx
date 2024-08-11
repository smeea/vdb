import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';

const DeckSelectAdvTagsFilter = ({ tagsFilter, handleChangeTagsFilter, allTagsOptions }) => {
  const { isMobile } = useApp();

  const tags = tagsFilter
    ? tagsFilter.map((tag) => ({
        label: tag,
        value: tag,
      }))
    : undefined;

  return (
    <Select
      variant="creatable"
      isMulti
      options={allTagsOptions}
      onChange={handleChangeTagsFilter}
      value={tags}
      placeholder="Filter by Tags"
      isSearchable={!isMobile}
    />
  );
};

export default DeckSelectAdvTagsFilter;
