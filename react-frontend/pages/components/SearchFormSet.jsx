import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import sets from './sets.js';

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
    } else if (!i[2]) {
      options.push({
        value: i[0],
        name: 'set',
        label: i[1],
      });
    } else {
      options.push({
        value: i[0],
        name: 'set',
        label: (
          <div className="d-flex justify-content-between">
            <div className="pr-2">{i[1]}</div>
            <div className="pl-2">{i[2]}</div>
          </div>
        ),
      });
    }
  });

  return (
    <Row className="py-1 pl-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Set:</label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="set"
          value={options.find((obj) => obj.value === props.value)}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchFormSet;
