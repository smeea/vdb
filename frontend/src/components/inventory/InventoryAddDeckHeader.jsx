import React from 'react';
import { Select, DeckSortButton, Checkbox, Input } from '@/components';
import { useApp } from '@/context';

const InventoryAddDeckHeader = ({
  handleChangeNameFilter,
  handleChangeTagsFilter,
  setRevFilter,
  setSortMethod,
  sortMethod,
  nameFilter,
  revFilter,
  tagsFilter,
  defaultTagsOptions,
}) => {
  const { isDesktop, isMobile } = useApp();

  return (
    <thead>
      <tr>
        <th className="min-w-[45px]"></th>
        {!isMobile && <th className="min-w-[50px]"></th>}
        <th className="max-sm:w-full sm:min-w-[250px] lg:min-w-[400px]">
          <Input
            placeholder="Filter by Name"
            name="text"
            autoComplete="off"
            spellCheck="false"
            value={nameFilter}
            onChange={handleChangeNameFilter}
          />
        </th>
        {isDesktop && <th className="min-w-[40px]"></th>}
        {!isMobile && <th className="min-w-[100px]"></th>}
        {!isMobile && (
          <th className="w-full px-1 text-start max-sm:px-0.5">
            <Select
              variant="creatable"
              isMulti
              options={defaultTagsOptions}
              onChange={handleChangeTagsFilter}
              defaultValue={tagsFilter}
              placeholder="Filter by Tags"
            />
          </th>
        )}
        <th className="min-w-[105px]">
          <div className="flex justify-end gap-1">
            <Checkbox
              label={isMobile ? 'Rev' : 'Show Revisions'}
              checked={revFilter}
              onChange={() => setRevFilter(!revFilter)}
            />
            <div className="flex items-center">
              <DeckSortButton sortMethod={sortMethod} onChange={setSortMethod} noText />
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default InventoryAddDeckHeader;
