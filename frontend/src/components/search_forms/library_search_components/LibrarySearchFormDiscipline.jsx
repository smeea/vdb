import React from 'react';
import { Col } from 'react-bootstrap';
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
            <div className="flex justify-center w-[40px]">
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
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <Col xs={3} className="px-0">
          <div className="font-bold text-blue">Discipline:</div>
          {value.value[0] !== 'any' && (
            <div className="flex justify-end pe-1">
              <div className="pe-1">
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

export default LibrarySearchFormDiscipline;
