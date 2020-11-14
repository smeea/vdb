import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchCryptFormCapacity(props) {
  const capacity = [
    'ANY',
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
    let v;
    i == 'ANY' ? (v = i.toLowerCase()) : (v = i);

    options.push({
      value: v,
      name: 'capacity',
      label: (
        <>
          <span className="margin-half" />
          {i}
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
      name: 'capacitymoreless',
      label: (
        <>
          <span className="margin-half" />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <Row className="py-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Capacity:</label>
      </Col>
      <Col xs={4} className="d-inline px-0">
        <Select
          options={morelessOptions}
          isSearchable={false}
          name="capacitymoreless"
          value={morelessOptions.find((obj) => obj.value === props.moreless)}
          onChange={props.onChange}
        />
      </Col>
      <Col xs={5} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="capacity"
          value={options.find((obj) => obj.value === props.value)}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchCryptFormCapacity;
