import { useState } from 'react';
import At from '@icons/at.svg?react';
import PinAngleFill from '@icons/pin-angle-fill.svg?react';
import Shuffle from '@icons/shuffle.svg?react';
import { Checkbox, DeckSelectAdvTagsFilter, Input, Select } from '@/components';
import { ANY, H, NAME, S, TYPE_DEBOUNCE_DELAY } from '@/constants';
import { useApp } from '@/context';
import { useDebounce } from '@/hooks';

const DeckSelectAdvTableHeader = ({
  allTagsOptions,
  clanOptions,
  setClanFilter,
  setInvFilter,
  setNameFilter,
  setRevFilter,
  setTagsFilter,
  clanFilter,
  invFilter,
  revFilter,
  tagsFilter,
  toggleSelectAll,
  isSelectedAll,
  short,
}) => {
  const { inventoryMode, isMobile, isNarrow, isDesktop } = useApp();

  const [debouncedNameFilter, setDebouncedNameFilter] = useState('');
  useDebounce(() => setNameFilter(debouncedNameFilter), TYPE_DEBOUNCE_DELAY, [debouncedNameFilter]);

  const invOptions = [
    {
      value: ANY,
      label: 'ANY',
    },
    {
      value: '',
      label: (
        <div className="flex justify-center">
          <At />
        </div>
      ),
    },
    {
      value: S,
      label: (
        <div className="flex justify-center">
          <Shuffle />
        </div>
      ),
    },
    {
      value: H,
      label: (
        <div className="flex justify-center">
          <PinAngleFill />
        </div>
      ),
    },
  ];

  const handleChangeNameFilter = (event) => {
    setDebouncedNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  const options = allTagsOptions.map((tag) => {
    return {
      value: tag,
      label: tag,
    };
  });

  return (
    <thead>
      <tr>
        {!short && (
          <th className="min-w-[30px] max-sm:hidden">
            <Checkbox
              name="selectAll"
              checked={isSelectedAll}
              onChange={toggleSelectAll}
              className="justify-center"
            />
          </th>
        )}
        {inventoryMode && (
          <th className="min-w-[52px] py-1 max-sm:hidden">
            <Select
              options={invOptions}
              onChange={(e) => setInvFilter(e.value)}
              value={invOptions.find((obj) => obj.value === invFilter)}
              isSearchable={false}
              noDropdown
            />
          </th>
        )}
        <th className="min-w-[60px] p-1 max-sm:hidden sm:min-w-[70px]">
          <Select
            options={clanOptions}
            onChange={(e) => setClanFilter(e.value)}
            value={clanOptions.find((obj) => obj.value === clanFilter.toLowerCase())}
            isSearchable
            noDropdown
          />
        </th>
        <th className="min-w-[45vw] max-sm:p-1 sm:min-w-[340px] sm:py-1">
          <Input
            placeholder="Filter by Deck or Card Name"
            name={NAME}
            autoComplete="off"
            spellCheck="false"
            value={debouncedNameFilter}
            onChange={handleChangeNameFilter}
          />
        </th>
        {!short && isDesktop && <th className="min-w-[30px] sm:min-w-[45px]" />}
        {!short && !isNarrow && <th className="min-w-[100px] sm:min-w-[105px]" />}
        {!short && (
          <th className="w-full text-start max-sm:py-0.5 sm:p-1">
            <DeckSelectAdvTagsFilter
              tagsFilter={tagsFilter}
              handleChangeTagsFilter={handleChangeTagsFilter}
              allTagsOptions={options}
            />
          </th>
        )}
        <th colSpan={short ? 2 : 1} className="p-1">
          <div className="flex items-center justify-end">
            <Checkbox
              name="revFilter"
              label={
                isDesktop ? (
                  <div className="whitespace-nowrap">Show Revisions</div>
                ) : isMobile ? (
                  'R'
                ) : (
                  'Rev'
                )
              }
              checked={revFilter}
              onChange={() => setRevFilter(!revFilter)}
            />
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default DeckSelectAdvTableHeader;
