import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';

const LibrarySearchFormPoolCost = ({ value, onChange, onMorelessChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const pool = ['ANY', '0', '1', '2', '3', '4', '5', '6'];
  const options = [];

  pool.map((i) => {
    let v;
    i == 'ANY' ? (v = i.toLowerCase()) : (v = i);

    options.push({
      value: v,
      name: 'pool',
      label: (
        <>
          <span className="me-3 me-sm-1 me-lg-3" />
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

  moreless.map((i) => {
    morelessOptions.push({
      value: i[0],
      name: 'pool',
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
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue">Pool Cost:</div>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={morelessOptions}
            isSearchable={false}
            name="pool-moreless"
            value={morelessOptions.find((obj) => obj.value === value.moreless)}
            onChange={onMorelessChange}
          />
        </Col>
        <Col xs={5} className="d-inline pe-0 ps-1">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name="pool"
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.pool)}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default LibrarySearchFormPoolCost;
