import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import sets from './forms_data/setOptions.json';

function SearchFormSet(props) {
  const options = [];

  sets.map((i, index) => {
    if (i[0] == 'any' || i[0] == 'bcp') {
      options.push({
        value: i[0],
        name: 'set',
        label: (
          <>
            <span className="margin-full" />
            {i[1]}
          </>
        ),
      });
    } else {
      options.push({
        value: i[0],
        name: 'set',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="pr-2">{i[1]}</div>
            <div className="pl-2 small">{i[2]}</div>
          </div>
        ),
      });
    }
  });

  const setOptions = [
    ['only in', 'Only In'],
    ['first print', 'First Printed In'],
  ];

  const setOptionsForm = setOptions.map((i, index) => {
    return (
      <div key={index} className="mr-3 custom-control custom-checkbox">
        <input
          id={`set-${i[0]}`}
          value={i[0]}
          name="set"
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChangeOptions(e)}
        />
        <label htmlFor={`set-${i[0]}`} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
    }

    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Row className="pt-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Set:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!props.isMobile}
            filterOption={filterOption}
            name="set"
            value={options.find((obj) => obj.value === props.value.set)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <Row className="pb-1 pl-1 mx-0 align-items-center">
        <Col xs={3} />
        <Col xs={9} className="d-flex justify-content-end">
          {setOptionsForm}
        </Col>
      </Row>
    </>
  );
}

export default SearchFormSet;
