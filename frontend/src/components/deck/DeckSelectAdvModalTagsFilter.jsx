import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

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
      classNamePrefix="border border-bgSecondary dark:border-bgSecondary react-select-tags"
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
