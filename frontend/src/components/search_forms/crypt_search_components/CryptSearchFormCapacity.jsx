import React from 'react';
import { Row, Col } from 'react-bootstrap';
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
  const capacity = [
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
  ];
  const options = [];

  capacity.map((i) => {
    options.push({
      value: i,
      name: name,
      label: (
        <>
          <span className="me-3 me-sm-1 me-lg-3" />
          {i.toUpperCase()}
        </>
      ),
    });
  });

  const moreless = [
    ['le', '<='],
    ['eq', '=='],
    ['ge', '>='],
  ];
  const morelessOptions = [];

  moreless.map((i) => {
    morelessOptions.push({
      value: i[0],
      name: name,
      label: (
        <>
          <span className="me-3 me-sm-0 me-lg-3" />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="px-0">
          <div className="bold blue">Capacity:</div>
          {value.value[0][name] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              <div className="pe-1">
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
        </Col>
        <Col xs={4} className="d-inline px-0">
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
        </Col>
        <Col xs={5} className="d-inline pe-0 ps-1">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0][name])}
            onChange={onChange}
          />
        </Col>
      </Row>
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
