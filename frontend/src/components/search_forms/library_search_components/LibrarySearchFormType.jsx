import React from 'react';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import { cardtypeSorted } from 'utils/constants';
import { useApp } from 'context';

const LibrarySearchFormType = ({ value, onChange, searchForm }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'type';
  const options = ['ANY', ...cardtypeSorted].map((i) => {
    if (i == 'ANY') {
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
      const imgSrc = `${process.env.ROOT_URL}images/types/${i
        .toLowerCase()
        .replace(/[\s,:!?'.-]/g, '')}.svg`;
      return {
        value: i.toLowerCase(),
        name: 'type',
        label: (
          <div className="flex items-center">
            <div className="flex w-[40px] justify-center">
              <img src={imgSrc} className="discipline-image w-[25px]" />
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
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Type:
          </div>
          {value.value[0] !== 'any' && (
            <div className="flex justify-end space-x-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value.logic}
                searchForm={searchForm}
                withAnd
              />
              {value.value.length == 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel
                  searchForm={searchForm}
                  i={0}
                  name={name}
                />
              )}
            </div>
          )}
        </div>
        <div className="w-3/4">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find(
              (obj) => obj.value === value.value[0].toLowerCase()
            )}
            onChange={onChange}
          />
        </div>
      </div>
      <SearchAdditionalForms
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

export default LibrarySearchFormType;
