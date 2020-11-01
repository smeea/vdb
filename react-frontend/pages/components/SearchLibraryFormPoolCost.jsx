import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchLibraryFormPoolCost(props) {
  const pool = ['ANY', '0', '1', '2', '3', '4', '5', '6'];
  const options = [];

  pool.map((i, index) => {
    let v;
    i == 'ANY' ? (v = i.toLowerCase()) : (v = i);

    options.push({
      value: v,
      name: 'pool',
      label: (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              textAlign: 'center',
            }}
          />
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
      name: 'poolmoreless',
      label: (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              textAlign: 'center',
            }}
          />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <>
      <Row className="py-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">
            Pool Cost:
          </label>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            options={morelessOptions}
            isSearchable={false}
            name="poolmoreless"
            value={morelessOptions.find(
              (obj) => obj.value === props.moreless
            )}
            onChange={props.onChange}
          />
        </Col>
        <Col xs={5} className="d-inline px-0">
          <Select
            options={options}
            isSearchable={false}
            name="pool"
            value={options.find((obj) => obj.value === props.value)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default SearchLibraryFormPoolCost;
