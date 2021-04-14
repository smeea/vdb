import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchLibraryFormBloodCost(props) {
  const blood = ['ANY', '0', '1', '2', '3', '4'];
  const options = [];

  blood.map((i, index) => {
    let v;
    i == 'ANY' ? (v = i.toLowerCase()) : (v = i);

    options.push({
      value: v,
      name: 'blood',
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
      name: 'blood',
      label: (
        <>
          <span className="margin-half" />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Blood Cost:</label>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={morelessOptions}
            isSearchable={false}
            name="blood-moreless"
            value={morelessOptions.find(
              (obj) => obj.value === props.value.moreless
            )}
            onChange={props.onMorelessChange}
          />
        </Col>
        <Col xs={5} className="d-inline pr-0 pl-1">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name="blood"
            value={options.find((obj) => obj.value === props.value.blood)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default SearchLibraryFormBloodCost;
