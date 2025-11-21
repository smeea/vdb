import { Select } from "@/components";
import { useApp } from "@/context";

const DeckSelectAdvTagsFilter = ({ tagsFilter, handleChangeTagsFilter, allTagsOptions }) => {
  const { isMobile } = useApp();

  const tagList = tagsFilter
    ? tagsFilter.map((tag) => ({
        label: tag,
        value: tag,
      }))
    : null;

  return (
    <Select
      variant="creatable"
      isMulti
      options={allTagsOptions}
      onChange={handleChangeTagsFilter}
      value={tagList}
      placeholder="Filter by Tags"
      isSearchable={!isMobile}
    />
  );
};

export default DeckSelectAdvTagsFilter;
