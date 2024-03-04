import React, { useState } from 'react';
import Shuffle from '@/assets/images/icons/shuffle.svg?react';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg?react';
import At from '@/assets/images/icons/at.svg?react';
import { DeckSelectAdvTagsFilter, Select, Checkbox, Input } from '@/components';
import { useDebounce } from '@/hooks';
import { useApp } from '@/context';

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
  useDebounce(() => setNameFilter(debouncedNameFilter), 250, [
    debouncedNameFilter,
  ]);

  const invOptions = [
    {
      value: 'any',
      name: 'inventory',
      label: 'ANY',
    },
    {
      value: '',
      name: 'inventory',
      label: <At />,
    },
    {
      value: 's',
      name: 'inventory',
      label: <Shuffle />,
    },
    {
      value: 'h',
      name: 'inventory',
      label: <PinAngleFill />,
    },
  ];

  const handleChangeNameFilter = (event) => {
    setDebouncedNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  return (
    <thead>
      <tr>
        {!(short || isMobile) && (
          <th className="min-w-[30px]">
            <Checkbox
              name="selectAll"
              checked={isSelectedAll}
              onChange={toggleSelectAll}
              className="justify-center"
            />
          </th>
        )}
        {inventoryMode && !isMobile && (
          <th>
            <Select
              options={invOptions}
              onChange={(e) => setInvFilter(e.value)}
              value={invOptions.find((obj) => obj.value === invFilter)}
              isSearchable={false}
              noDropdown
            />
          </th>
        )}
        {(short || !isMobile) && (
          <th className="min-w-[60px] sm:min-w-[70px]">
            <Select
              options={clanOptions}
              onChange={(e) => setClanFilter(e.value)}
              value={clanOptions.find(
                (obj) => obj.value === clanFilter.toLowerCase(),
              )}
              isSearchable
              noDropdown
            />
          </th>
        )}
        <th className="min-w-[45vw] sm:min-w-[340px]">
          <Input
            placeholder="Filter by Deck or Card Name"
            type="text"
            name="text"
            autoComplete="off"
            spellCheck="false"
            value={debouncedNameFilter}
            onChange={handleChangeNameFilter}
          />
        </th>
        {!short && isDesktop && <th className="min-w-[30px] sm:min-w-[45px]" />}
        {!short && !isNarrow && (
          <th className="min-w-[100px] sm:min-w-[105px]" />
        )}
        {!short && (
          <th className="w-full">
            <DeckSelectAdvTagsFilter
              tagsFilter={tagsFilter}
              handleChangeTagsFilter={handleChangeTagsFilter}
              allTagsOptions={allTagsOptions}
            />
          </th>
        )}
        <th colSpan={short ? 2 : 1}>
          <div className="flex items-center justify-end p-1">
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
