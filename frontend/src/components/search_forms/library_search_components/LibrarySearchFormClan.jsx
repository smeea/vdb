import React from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import { ResultLibraryClan } from 'components';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { useApp } from 'context';

const LibrarySearchFormClan = ({ value, searchForm, onChange }) => {
  const { isXWide, isMobile } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'clan';

  const options = [
    'ANY',
    'Not Required',
    ...vampireClansList,
    ...imbuedClansList,
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
            <div className="flex justify-center w-[40px]">
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
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <Col
          xs={3}
          className="flex justify-between items-center px-0"
        >
          <div className="font-bold text-blue">Clan:</div>
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
            isSearchable={!isMobile}
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

export default LibrarySearchFormClan;
