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
    ['maneuver', 'Maneuver'],
    ['additional strike', 'Additional Strike'],
    ['aggravated', 'Aggravated'],
    ['prevent', 'Prevent'],
    ['press', 'Press'],
  ];

  const traitsRight = [
    ['enter combat', 'Enter combat'],
    ['unlock', 'Unlock'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['infernal', 'Infernal'],
    ['red list', 'Red List'],
    ['flight', 'Flight'],
    ['advanced', 'Advanced'],
    ['banned', 'Banned'],
    ['non-twd', 'Not in TWD'],
  ];

  const traitsLeftforms = traitsLeft.map((i, index) => {
    return (
      <div key={index} className="custom-control custom-checkbox">
        <input
          name="traits"
          id={`traits-${i[0]}`}
          value={i[0]}
          className="custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`traits-${i[0]}`} className="custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map((i, index) => {
    return (
      <div key={index} className="custom-control custom-checkbox">
        <input
          name="traits"
          id={`traits-${i[0]}`}
          value={i[0]}
          className="custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`traits-${i[0]}`} className="custom-control-label">
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
        <Col xs={6} className="d-inline pr-0">
          {traitsLeftforms}
        </Col>
        <Col xs={6} className="d-inline pr-0">
          {traitsRightforms}
        </Col>
      </Row>
    </>
  );
}

export default SearchCryptFormTraits;
