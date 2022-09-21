import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useApp } from 'context';

const LibrarySearchFormTraits = ({ value, onChange }) => {
  const { playtest } = useApp();

  const traitsLeft = [
    ['intercept', '+Intercept / -Stealth'],
    ['stealth', '+Stealth / -Intercept'],
    ['bleed', '+Bleed'],
    ['votes-title', '+Votes / Title'],
    ['strength', '+Strength'],
    ['dodge', 'Dodge'],
    ['maneuver', 'Maneuver'],
    ['additional strike', 'Additional Strike'],
    ['aggravated', 'Aggravated'],
    ['prevent', 'Prevent'],
    ['press', 'Press'],
    ['combat ends', 'Combat Ends'],
  ];

  const traitsRight = [
    ['enter combat', 'Enter Combat'],
    ['bounce bleed', 'Bounce Bleed'],
    ['reduce bleed', 'Reduce Bleed'],
    ['unlock', 'Wake / Unlock'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['infernal', 'Infernal'],
    ['embrace', 'Create vampire'],
    ['burn', 'Burn Option'],
    ['banned', 'Banned'],
    ['non-twd', 'Not in TWD'],
    ['no-requirements', 'No Requirement'],
  ];

  if (playtest) traitsRight.push(['playtest', 'Playtest']);

  const traitsLeftforms = traitsLeft.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="traits"
        value={i[0]}
        type="checkbox"
        id={`traits-${i[0]}`}
        label={i[1]}
        checked={value[i[0]]}
        onChange={(e) => onChange(e)}
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
        id={`traits-${i[0]}`}
        label={i[1]}
        checked={value[i[0]]}
        onChange={(e) => onChange(e)}
      />
    );
  });

  return (
    <>
      <Row className="mx-0 py-1 ps-1">
        <Col className="d-flex px-0">
          <div className="bold blue">Traits:</div>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col xs={7} className="d-inline pe-0">
          {traitsLeftforms}
        </Col>
        <Col xs={5} className="d-inline px-0">
          {traitsRightforms}
        </Col>
      </Row>
    </>
  );
};

export default LibrarySearchFormTraits;
