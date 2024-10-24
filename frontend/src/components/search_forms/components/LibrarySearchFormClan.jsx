import React from 'react';
import { Select } from '@/components';
import {
  ResultLibraryClan,
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '@/components';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import { useApp } from '@/context';
import { ANY } from '@/utils/constants';

const LibrarySearchFormClan = ({ value, searchForm, onChange }) => {
  const { playtestMode, isXWide, isMobile } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'clan';

  const options = ['ANY', 'Not Required', ...vampireClansList, ...imbuedClansList]
    .filter((clan) => playtestMode || clan !== 'Hecata')
    .map((i) => {
      if (['ANY', 'Not Required'].includes(i)) {
        return {
          value: i.toLowerCase(),
          name: name,
          label: (
            <div className="flex items-center">
              <div className="flex w-[40px]" />
              {i}
            </div>
          ),
        };
      } else {
        return {
          value: i.toLowerCase(),
          name: name,
          label: (
            <div className="flex items-center">
              <div className="flex w-[40px] justify-center">
                <ResultLibraryClan value={i} />
              </div>
              {i}
            </div>
          ),
        };
      }
    });

  return (
    <>
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Clan:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value.logic}
                searchForm={searchForm}
              />
              {value.value.length == 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel searchForm={searchForm} i={0} name={name} />
              )}
            </div>
          )}
        </div>
        <div className="w-3/4">
          <Select
            options={options}
            isSearchable={!isMobile}
            isClearable={value.value[0] !== ANY}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0].toLowerCase())}
            onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
          />
        </div>
      </div>
      <SearchAdditionalForms
        isClearable
        value={value}
        name={name}
        searchForm={searchForm}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
    </>
  );
};

export default LibrarySearchFormClan;
