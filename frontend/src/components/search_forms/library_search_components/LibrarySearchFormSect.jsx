import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonGroupToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import { useApp } from 'context';

const LibrarySearchFormSect = ({ value, setFormState, onChange }) => {
  const { isWide, isMobile } = useApp();
  const topOffset = 345

  const sects = [
    'ANY',
    'Not Required',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ];

  const options = [];

  sects.map((i, index) => {
    options.push({
      value: i.toLowerCase(),
      name: 'sect',
      label: (
        <>
          <span className="margin-full" />
          {i}
        </>
      ),
    });
  });

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col
          xs={3}
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div className="bold blue">Sect:</div>
          {value.value[0] !== 'any' && (
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
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={0}
            maxMenuHeight={
              isMobile
                ? 350
                : isWide
                  ? 800 - topOffset
                  : 700 - topOffset
            }
            value={options.find(
              (obj) => obj.value === value.value[0].toLowerCase()
            )}
            onChange={onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        value={value}
        options={options}
        onChange={onChange}
        setFormState={setFormState}
      />
    </>
  );
}

export default LibrarySearchFormSect;
