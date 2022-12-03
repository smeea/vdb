import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { useApp } from 'context';

const LibrarySearchFormTraits = ({ value, onChange }) => {
  const { playtest } = useApp();

  const traitsLeftforms = [
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
    ['enter combat', 'Enter Combat'],
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
    ['bloat', 'Blood to Uncontrolled'],
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
    ['playtest', 'Playtest'],
  ]
    .filter((i) => i[0] !== 'playtest' || playtest)
    .map((i, index) => (
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

  return (
    <>
      <div className="flex flex-row mx-0 py-1 ps-1">
        <div className="flex px-0">
          <div className="font-bold text-blue">Traits:</div>
        </div>
      </div>
      <div className="flex flex-row mx-0">
        <div className="xs={7} d-inline pe-0">
          {traitsLeftforms}
        </div>
        <div className="xs={5} d-inline px-0">
          {traitsRightforms}
        </div>
      </div>
    </>
  );
};

export default LibrarySearchFormTraits;
