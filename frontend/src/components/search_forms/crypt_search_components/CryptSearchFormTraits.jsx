import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useApp } from 'context';

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtest } = useApp();

  const traitsLeftforms = [
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
  ].map((i, index) => (
    <Form.Check
      key={index}
      name="traits"
      value={i[0]}
      type="checkbox"
      id={`traits-${i[0]}`}
      label={i[1]}
      checked={value[i[0]]}
      onChange={onChange}
    />
  ));

  const traitsRightforms = [
    ['enter combat', 'Enter combat'],
    ['unlock', 'Unlock'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['infernal', 'Infernal'],
    ['red list', 'Red List'],
    ['flight', 'Flight'],
    ['advancement', 'Advancement'],
    ['banned', 'Banned'],
    ['non-twd', 'Not in TWD'],
    ['playtest', 'Playtest'],
  ]
    .filter((i) => i[0] !== 'playtest' || playtest)
    .map((i, index) => {
      return (
        <Form.Check
          key={index}
          name="traits"
          value={i[0]}
          type="checkbox"
          id={`traits-${i[0]}`}
          label={i[1]}
          checked={value[i[0]]}
          onChange={onChange}
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
        <Col xs={6} className="d-inline pe-0">
          {traitsLeftforms}
        </Col>
        <Col xs={6} className="d-inline pe-0">
          {traitsRightforms}
        </Col>
      </Row>
    </>
  );
};

export default CryptSearchFormTraits;
