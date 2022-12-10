import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';

const CryptSearchFormCapacity = ({ value, searchForm, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'capacity';

  const options = [
    'any',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ].map((i) => ({
    value: i,
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-1 me-lg-3" />
        {i.toUpperCase()}
      </>
    ),
  }));

  const morelessOptions = [
    ['le', '<='],
    ['eq', '=='],
    ['ge', '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-0 me-lg-3" />
        {i[1]}
      </>
    ),
  }));

  return (
    <>
      <div className="pl-1 mx-0 flex flex-row items-center py-1">
        <div className="basis-1/4 px-0">
          <div className="text-blue font-bold">Capacity:</div>
          {value.value[0][name] !== 'any' && (
            <div className="pr-1 flex justify-end">
              <div className="pr-1">
                <SearchFormButtonLogicToggle
                  name={name}
                  value={value.logic}
                  searchForm={searchForm}
                />
              </div>
              {value.value.length == 1 ? (
                <SearchFormButtonAdd
                  searchForm={searchForm}
                  name={name}
                  withMoreless
                />
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
        <div className="inline basis-1/3 px-0">
          <Select
            classNamePrefix="react-select"
            options={morelessOptions}
            isSearchable={false}
            name={0}
            value={morelessOptions.find(
              (obj) => obj.value === value.value[0].moreless
            )}
            onChange={onChange}
          />
        </div>
        <div className="pr-0 pl-1 inline basis-5/12">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0][name])}
            onChange={onChange}
          />
        </div>
      </div>
      <SearchAdditionalForms
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        searchForm={searchForm}
        withMoreless={true}
        morelessOptions={morelessOptions}
        maxMenuHeight={maxMenuHeight}
      />
    </>
  );
};

export default CryptSearchFormCapacity;
