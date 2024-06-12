import React from 'react';
import {
  Select,
  ResultClanImage,
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '@/components';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import { useApp } from '@/context';

const TwdSearchFormClan = ({ value, searchForm, onChange }) => {
  const { playtestMode, isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 400 : 350;
  const name = 'clan';
  const options = ['ANY', ...vampireClansList, ...imbuedClansList]
    .filter((clan) => playtestMode || clan !== 'Hecata')
    .map((i) => {
      if (i == 'ANY' || i == 'NONE') {
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
              <div className="flex w-[40px]">
                <ResultClanImage value={i} />
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
        {/* <div className="w-1/4"> */}
        {/*   <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Clan:</div> */}
        {/* </div> */}

        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Clan:</div>
          {value.value[0] !== 'any' && (
            <div className="flex justify-end space-x-1 px-1">
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
            isClearable={value !== 'any'}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.toLowerCase())}
            onChange={(e) => onChange(e ?? { name: name, value: 'any' })}
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

export default TwdSearchFormClan;
