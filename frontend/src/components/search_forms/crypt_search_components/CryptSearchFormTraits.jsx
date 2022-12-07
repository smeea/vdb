import React from 'react';
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
      );
    });

  return (
    <>
      <div className="ps-1 mx-0 flex flex-row py-1">
        <div className="flex px-0">
          <div className="text-blue font-bold">Traits:</div>
        </div>
      </div>
      <div className="mx-0 flex flex-row">
        <div className="pe-0 inline basis-7/12">{traitsLeftforms}</div>
        <div className="pe-0 inline basis-5/12">{traitsRightforms}</div>
      </div>
    </>
  );
};

export default CryptSearchFormTraits;
