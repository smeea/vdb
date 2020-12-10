import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import precons from './precons.js';

function SearchFormPrecon(props) {
  const options = [];

  precons.map((i, index) => {
    if (i[0] == 'any' || i[0] == 'bcp') {
      options.push({
        value: i[0],
        name: 'precon',
        label: (
          <>
            <span className="margin-full" />
            {i[1]}
          </>
        ),
      });
    } else {
      options.push({
        value: i[1] + ':' + i[2],
        name: 'precon',
        label: (
          <div className="d-flex justify-content-between">
            <div className="pr-2">{i[3]}</div>
            <div className="pl-2 gray-small">{`${i[1]} '${i[0]}`}</div>
          </div>
        ),
      });
    }
  });

  const preconOptions = [
    ['only in', 'Only In'],
    ['first print', 'First Printed In'],
  ];

  const preconOptionsForm = preconOptions.map((i, index) => {
    return (
      <div key={index} className="mr-3 custom-control custom-checkbox">
        <input
          id={`precon-${i[0]}`}
          value={i[0]}
          name="preconOptions"
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.options[i[0]]}
          onChange={(e) => props.onChangeOptions(e)}
        />
        <label htmlFor={`precon-${i[0]}`} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <>
      <Row className="pt-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Precon:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            options={options}
            isSearchable={false}
            name="precon"
            value={options.find((obj) => obj.value === props.value)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <Row className="pb-1 pl-1 mx-0 align-items-center">
        <Col xs={3} />
        <Col xs={9} className="d-flex justify-content-end">
          {preconOptionsForm}
        </Col>
      </Row>
    </>
  );
}

export default SearchFormPrecon;
