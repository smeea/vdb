import { Checkbox, DeckSortButton, Input, Select } from '@/components';
import { TEXT } from '@/constants';
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
  const { isMobile } = useApp();

  return (
    <thead>
      <tr>
        <th className="min-w-[45px]"></th>
        <th className="min-w-[50px] max-sm:hidden"></th>
        <th className="py-1 max-sm:w-full sm:min-w-[250px] lg:min-w-[400px]">
          <Input
            placeholder="Filter by Name"
            name={TEXT}
            autoComplete="off"
            spellCheck="false"
            value={nameFilter}
            onChange={handleChangeNameFilter}
          />
        </th>
        <th className="min-w-[40px] max-lg:hidden"></th>
        <th className="min-w-[100px] max-sm:hidden"></th>
        <th className="w-full text-start max-sm:hidden max-sm:py-0.5 sm:p-1">
          <Select
            variant="creatable"
            isMulti
            options={defaultTagsOptions}
            onChange={handleChangeTagsFilter}
            defaultValue={tagsFilter}
            placeholder="Filter by Tags"
          />
        </th>
        <th className="min-w-[110px] ps-1">
          <div className="flex justify-end gap-1 sm:gap-2">
            <Checkbox
              label={isMobile ? 'Show Rev' : 'Show Revisions'}
              checked={revFilter}
              onChange={() => setRevFilter(!revFilter)}
            />
            <div className="flex items-center">
              <DeckSortButton sortMethod={sortMethod} onChange={setSortMethod} />
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default InventoryAddDeckHeader;
