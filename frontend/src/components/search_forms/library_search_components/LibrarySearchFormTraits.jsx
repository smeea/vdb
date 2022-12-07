import React from 'react';
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
    <input
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
      <input
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
      <div className="ps-1 mx-0 flex flex-row py-1">
        <div className="flex px-0">
          <div className="text-blue font-bold">Traits:</div>
        </div>
      </div>
      <div className="mx-0 flex flex-row">
        <div className="pe-0 inline basis-7/12">{traitsLeftforms}</div>
        <div className="inline basis-5/12 px-0">{traitsRightforms}</div>
      </div>
    </>
  );
};

export default LibrarySearchFormTraits;
