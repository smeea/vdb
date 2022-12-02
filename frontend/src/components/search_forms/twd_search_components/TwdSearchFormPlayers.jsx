import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import { useApp } from 'context';

const TwdSearchFormPlayers = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'players';
  const fromOptions = [];
  const toOptions = [];

  ['ANY', '100', '50', '30', '20', '10'].map((i) => {
    if (i === 'ANY' || value.to === 'any' || parseInt(i) < value.to) {
      fromOptions.push({
        value: i.toLowerCase(),
        name: 'from',
        label: (
          <>
            <span className="me-1" />
            {i}
          </>
        ),
      });
    }

    if (i === 'ANY' || value.from === 'any' || parseInt(i) > value.from) {
      toOptions.push({
        value: i.toLowerCase(),
        name: 'to',
        label: (
          <>
            <span className="me-1" />
            {i}
          </>
        ),
      });
    }
  });

  return (
    <>
      <Row className="mx-0 align-items-center">
        <Col xs={1} className="d-inline px-0" />
        <Col xs={5} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={fromOptions}
            isSearchable={false}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={fromOptions.find((obj) => obj.value === value.from)}
            onChange={onChange}
          />
        </Col>
        <Col xs={1} className="d-flex justify-content-center px-0">
          <div className="text-xs px-0">to</div>
        </Col>
        <Col xs={5} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={toOptions}
            isSearchable={false}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={toOptions.find((obj) => obj.value === value.to)}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default TwdSearchFormPlayers;
