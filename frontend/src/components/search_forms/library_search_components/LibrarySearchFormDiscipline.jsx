import React from 'react';
import { Select } from '@/components';
import { ResultDisciplineImage } from '@/components';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import disciplinesList from '@/assets/data/disciplinesList.json';
import virtuesList from '@/assets/data/virtuesList.json';
import { useApp } from '@/context';

const LibrarySearchFormDiscipline = ({ value, onChange, searchForm }) => {
  const { isXWide, isMobile } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'discipline';
  const disciplinesExtendedList = [
    ...disciplinesList,
    'Flight',
    'Maleficia',
    'Striga',
  ].sort();

  const options = [
    'ANY',
    'Not Required',
    ...disciplinesExtendedList,
    ...virtuesList,
  ].map((i) => {
    if (i == 'ANY' || i == 'Not Required') {
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
              <ResultDisciplineImage value={i} size="lg" />
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
        <div className="w-1/4">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Discipline:
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
            options={options}
            isSearchable={!isMobile}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find(
              (obj) => obj.value === value.value[0].toLowerCase(),
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

export default LibrarySearchFormDiscipline;
