import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

function TwdSearchFormPlayers(props) {
  const players = [
    'ANY',
    '100',
    '50',
    '30',
    '20',
    '10',
  ]

  const playersFromOptions = [];
  const playersToOptions = [];

  players.map((i, index) => {
    playersFromOptions.push({
      value: i.toLowerCase(),
      name: 'playersFrom',
      label: (
        <>
          <span className="margin-third" />
          {i}
        </>
      ),
    });

    playersToOptions.push({
      value: i.toLowerCase(),
      name: 'playersTo',
      label: (
        <>
          <span className="margin-third" />
          {i}
        </>
      ),
    });
  });

  return (
    <>
      <Row className="mx-0 align-items-center">
        <Col xs={5} className="d-inline px-0">
          <Select
            options={playersFromOptions}
            isSearchable={false}
            name="playersFrom"
            value={playersFromOptions.find((obj) => obj.value === props.playersFrom)}
            onChange={props.onChange}
          />
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">max</label>
        </Col>
        <Col xs={5} className="d-inline px-0">
          <Select
            options={playersToOptions}
            isSearchable={false}
            name="playersTo"
            value={playersToOptions.find((obj) => obj.value === props.playersTo)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default TwdSearchFormPlayers;
