import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';

const LibrarySearchFormBloodCost = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'blood';
  const options = ['ANY', '0', '1', '2', '3', '4'].map((i) => ({
    value: i === 'ANY' ? i.toLowerCase() : i,
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-1 me-lg-3" />
        {i}
      </>
    ),
  }));

  const morelessOptions = [
    ['le', '<='],
    ['eq', '=='],
    ['ge', '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-0 me-lg-3" />
        {i[1]}
      </>
    ),
  }));

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="font-bold text-blue">Blood Cost:</div>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={morelessOptions}
            isSearchable={false}
            name={`${name}-moreless`}
            value={morelessOptions.find((obj) => obj.value === value.moreless)}
            onChange={onChange}
          />
        </Col>
        <Col xs={5} className="d-inline pe-0 ps-1">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value[name])}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default LibrarySearchFormBloodCost;
