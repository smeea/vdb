import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';
import {
  SearchAdditionalForms,
  SearchFormButtonGroupToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';

const CryptSearchFormCapacity = ({ value, setFormState, onChange }) => {
  const { isMobile } = useApp();

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

  capacity.map((i, index) => {
    options.push({
      value: i,
      name: 'capacity',
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

  moreless.map((i, index) => {
    morelessOptions.push({
      value: i[0],
      name: 'capacity',
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
          {value.value[0].capacity !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              <div className="pe-1">
                <SearchFormButtonGroupToggle
                  value={value}
                  setFormState={setFormState}
                />
              </div>
              {value.value.length == 1 ? (
                <SearchFormButtonAdd
                  setFormState={setFormState}
                  value={value}
                  withMoreless={true}
                />
              ) : (
                <SearchFormButtonDel
                  setFormState={setFormState}
                  value={value}
                  i={0}
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
            maxMenuHeight={isMobile ? 330 : 550}
            value={options.find((obj) => obj.value === value.value[0].capacity)}
            onChange={onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        value={value}
        options={options}
        onChange={onChange}
        setFormState={setFormState}
        withMoreless={true}
        morelessOptions={morelessOptions}
      />
    </>
  );
};

export default CryptSearchFormCapacity;
