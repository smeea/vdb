import React, { useMemo } from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';

const DeckSelectAdvTagsFilter = ({ tagsFilter, handleChangeTagsFilter, allTagsOptions }) => {
  const { isMobile } = useApp();

  const tagList = useMemo(() => {
    return tagsFilter
      ? tagsFilter.map((tag) => ({
          label: tag,
          value: tag,
        }))
      : undefined;
  }, [tagsFilter]);

  return (
    <Select
      variant="creatable"
      isMulti
      options={allTagsOptions}
      onChange={handleChangeTagsFilter}
      value={tagList}
      placeholder={<div className="text-center">Filter by Tags</div>}
      isSearchable={!isMobile}
    />
  );
};

export default DeckSelectAdvTagsFilter;
