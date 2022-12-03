import React from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import { useApp } from 'context';

const LibrarySearchFormTitle = ({ value, onChange, searchForm }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'title';

  const options = [
    'ANY',
    'Not Required',
    'Non-titled',
    'Titled',
    'Primogen',
    'Prince',
    'Justicar',
    'Inner Circle',
    'Baron',
    'Bishop',
    'Archbishop',
    'Priscus',
    'Cardinal',
    'Regent',
    'Magaji',
  ].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        {i}
      </div>
    ),
  }));

  return (
    <>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <Col
          xs={3}
          className="flex justify-between items-center px-0"
        >
          <div className="font-bold text-blue">Title:</div>
          {value.value[0] !== 'any' && (
            <div className="flex justify-end pe-1">
              <div className="pe-1">
                <SearchFormButtonLogicToggle
                  name={name}
                  value={value.logic}
                  searchForm={searchForm}
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
        </Col>
        <Col xs={9} className="d-inline px-0">
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
        </Col>
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

export default LibrarySearchFormTitle;
