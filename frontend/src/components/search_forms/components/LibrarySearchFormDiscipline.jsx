import React from 'react';
import {
  Select,
  ResultDisciplineImage,
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '@/components';
import disciplinesList from '@/assets/data/disciplinesList.json';
import disciplinesExtraList from '@/assets/data/disciplinesExtraList.json';
import virtuesList from '@/assets/data/virtuesList.json';
import { useApp } from '@/context';
import { NOT_REQUIRED, ANY } from '@/constants';

const LibrarySearchFormDiscipline = ({ value, onChange, searchForm }) => {
  const { isXWide, isMobile } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'discipline';
  const disciplines = [...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted();

  const options = [
    ['ANY', ANY],
    ['Not Required', NOT_REQUIRED],
    ...disciplines.map((d) => [d, d.toLowerCase()]),
    ...Object.keys(virtuesList).map((v) => [v, v.toLowerCase()]),
  ].map((i) => ({
    value: i[1],
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px] justify-center">
          {![ANY, NOT_REQUIRED].includes(i[1]) && <ResultDisciplineImage value={i[1]} size="lg" />}
        </div>
        {i[0]}
      </div>
    ),
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/4">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Discipline:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value.logic}
                searchForm={searchForm}
                withAnd
                withOnly
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
            value={options.find((obj) => obj.value === value.value[0])}
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

export default LibrarySearchFormDiscipline;
