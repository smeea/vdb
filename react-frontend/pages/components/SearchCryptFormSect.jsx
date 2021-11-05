import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import AdditionalForms from './SearchAdditionalForms.jsx';
import SearchFormButtonGroupToggle from './SearchFormButtonGroupToggle.jsx';
import SearchFormButtonAdd from './SearchFormButtonAdd.jsx';
import SearchFormButtonDel from './SearchFormButtonDel.jsx';

function SearchCryptFormSect(props) {
  const sects = [
    'ANY',
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
          {props.value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              <div className="pe-1">
                <SearchFormButtonGroupToggle
                  value={props.value}
                  setFormState={props.setFormState}
                />
              </div>
              {props.value.value.length == 1 ? (
                <SearchFormButtonAdd
                  setFormState={props.setFormState}
                  value={props.value}
                />
              ) : (
                <SearchFormButtonDel
                  setFormState={props.setFormState}
                  value={props.value}
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
            value={options.find(
              (obj) => obj.value === props.value.value[0].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <AdditionalForms
        value={props.value}
        options={options}
        onChange={props.onChange}
        toggleForm={props.toggleForm}
        setFormState={props.setFormState}
      />
    </>
  );
}

export default SearchCryptFormSect;
