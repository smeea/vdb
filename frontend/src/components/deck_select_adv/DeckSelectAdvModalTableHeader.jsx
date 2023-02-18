import React from 'react';
import Select from 'react-select';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import At from '@/assets/images/icons/at.svg';
import {
  DeckSelectSortForm,
  DeckSelectAdvModalTagsFilter,
  Checkbox,
  Input,
} from '@/components';
import { useApp } from '@/context';

const DeckSelectAdvModalTableHeader = ({
  allTagsOptions,
  clanOptions,
  setSortMethod,
  setClanFilter,
  setInvFilter,
  setNameFilter,
  setRevFilter,
  setTagsFilter,
  clanFilter,
  invFilter,
  nameFilter,
  revFilter,
  tagsFilter,
  toggleSelectAll,
  isSelectedAll,
}) => {
  const { inventoryMode, isMobile, isDesktop } = useApp();

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
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  return (
    <thead>
      <tr>
        <th className="min-w-[30px]">
          <Checkbox
            name="selectAll"
            checked={isSelectedAll}
            onChange={toggleSelectAll}
            className="justify-center"
          />
        </th>
        {inventoryMode && !isMobile && (
          <th>
            <Select
              classNamePrefix="no-dropdown react-select"
              options={invOptions}
              onChange={(e) => setInvFilter(e.value)}
              value={invOptions.find((obj) => obj.value === invFilter)}
              isSearchable={false}
            />
          </th>
        )}
        {!isMobile && (
          <th className="min-w-[60px]">
            <Select
              classNamePrefix="no-dropdown react-select"
              options={clanOptions}
              onChange={(e) => setClanFilter(e.value)}
              value={clanOptions.find(
                (obj) => obj.value === clanFilter.toLowerCase()
              )}
              isSearchable
            />
          </th>
        )}
        <th className="min-w-[45vw] sm:min-w-[340px]">
          <Input
            className="w-full"
            placeholder="Filter by Deck or Card Name"
            type="text"
            name="text"
            autoComplete="off"
            spellCheck="false"
            value={nameFilter}
            onChange={handleChangeNameFilter}
          />
        </th>
        {isDesktop && <th />}
        {!isMobile && <th />}
        <th className="w-full">
          <DeckSelectAdvModalTagsFilter
            tagsFilter={tagsFilter}
            handleChangeTagsFilter={handleChangeTagsFilter}
            allTagsOptions={allTagsOptions}
          />
        </th>
        <th>
          <div className="flex max-sm:flex-col justify-end gap-1">
            <Checkbox
              name="revFilter"
              label={isDesktop ? 'Show Revisions' : 'Rev'}
              checked={revFilter}
              onChange={() => setRevFilter(!revFilter)}
            />
            <DeckSelectSortForm onChange={setSortMethod} />
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default DeckSelectAdvModalTableHeader;
