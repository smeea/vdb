import React from 'react';
import { Row, Col } from 'react-bootstrap';

function SearchCryptFormTraits(props) {
  const traitsLeft = [
    ['1 intercept', '+1 intercept'],
    ['1 stealth', '+1 stealth'],
    ['1 bleed', '+1 bleed'],
    ['2 bleed', '+2 bleed'],
    ['1 strength', '+1 strength'],
    ['2 strength', '+2 strength'],
    ['additional strike', 'Additional Strike'],
    ['optional maneuver', 'Maneuver'],
    ['optional press', 'Press'],
  ];

  const traitsRight = [
    ['prevent', 'Prevent'],
    ['aggravated', 'Aggravated'],
    ['enter combat', 'Enter combat'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['infernal', 'Infernal'],
    ['red list', 'Red List'],
    ['flight', 'Flight'],
  ];

  const traitsLeftforms = traitsLeft.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          name="traits"
          id={`traits-${i[0]}`}
          value={i[0]}
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`traits-${i[0]}`} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          name="traits"
          id={`traits-${i[0]}`}
          value={i[0]}
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`traits-${i[0]}`} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <>
      <Row className="mx-0 py-1 pl-1">
        <Col className="d-flex px-0">
          <label className="h6 mb-0">Traits:</label>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col xs={6} className="d-inline">
          {traitsLeftforms}
        </Col>
        <Col xs={6} className="d-inline">
          {traitsRightforms}
        </Col>
      </Row>
    </>
  );
}

export default SearchCryptFormTraits;
