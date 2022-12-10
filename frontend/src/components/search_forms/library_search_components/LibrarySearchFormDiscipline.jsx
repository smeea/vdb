import React from 'react';
import Select from 'react-select';
import { ResultDisciplineImage } from 'components';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';
import { useApp } from 'context';

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
              <ResultDisciplineImage
                className="type-discipline-image-forms"
                value={i}
              />
            </div>
            {i}
          </div>
        ),
      };
    }
  });

  return (
    <>
      <div className="pl-1 mx-0 flex flex-row items-center py-1">
        <div className="basis-1/4 px-0">
          <div className="text-blue font-bold">Discipline:</div>
          {value.value[0] !== 'any' && (
            <div className="pr-1 flex justify-end">
              <div className="pr-1">
                <SearchFormButtonLogicToggle
                  name={name}
                  value={value.logic}
                  searchForm={searchForm}
                  withAnd
                />
              </div>
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
        <div className="inline basis-9/12 px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
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

export default LibrarySearchFormDiscipline;
