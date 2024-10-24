import React from 'react';
import {
  Select,
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '@/components';
import { useApp } from '@/context';
import { ANY } from '@/utils/constants';

const CryptSearchFormSect = ({ value, searchForm, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'sect';
  const options = ['ANY', 'Camarilla', 'Sabbat', 'Laibon', 'Independent', 'Anarch', 'Imbued'].map(
    (i) => ({
      value: i.toLowerCase(),
      name: name,
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px]" />
          {i}
        </div>
      ),
    }),
  );

  return (
    <>
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Sect:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <div>
                <SearchFormButtonLogicToggle
                  name={name}
                  value={value.logic}
                  searchForm={searchForm}
                />
              </div>
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
            isSearchable={false}
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

export default CryptSearchFormSect;
