import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function SearchLibraryFormTraits(props) {
  const traitsLeft = [
    ['intercept', '+Intercept / -Stealth'],
    ['stealth', '+Stealth / -Intercept'],
    ['bleed', '+Bleed'],
    ['strength', '+Strength'],
    ['dodge', 'Dodge'],
    ['maneuver', 'Maneuver'],
    ['additional strike', 'Additional Strike'],
    ['aggravated', 'Aggravated'],
    ['prevent', 'Prevent'],
    ['press', 'Press'],
    ['combat ends', 'Combat Ends'],
    ['enter combat', 'Enter Combat'],
  ];

  const traitsRight = [
    ['bounce bleed', 'Bounce Bleed'],
    ['unlock', 'Wake / Unlock'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['anarch', 'Anarch'],
    ['infernal', 'Infernal'],
    ['burn', 'Burn Option'],
    ['banned', 'Banned'],
    ['non-twd', 'Not in TWD'],
    ['no-requirements', 'No Requirements'],
  ];

  const traitsLeftforms = traitsLeft.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="traits"
        value={i[0]}
        type="checkbox"
        checked={props.value[i[0]]}
        id={`traits-${i[0]}`}
        label={i[1]}
        onChange={(e) => props.onChange(e)}
      />
    );
  });

  const traitsRightforms = traitsRight.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="traits"
        value={i[0]}
        type="checkbox"
        checked={props.value[i[0]]}
        id={`traits-${i[0]}`}
        label={i[1]}
        onChange={(e) => props.onChange(e)}
      />
    );
  });

  return (
    <>
      <Row className="mx-0 py-1 ps-1">
        <Col className="d-flex px-0">
          <label className="h6 mb-0">Traits:</label>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col xs={6} className="d-inline pe-0">
          {traitsLeftforms}
        </Col>
        <Col xs={6} className="d-inline pe-0">
          {traitsRightforms}
        </Col>
      </Row>
    </>
  );
}

export default SearchLibraryFormTraits;
