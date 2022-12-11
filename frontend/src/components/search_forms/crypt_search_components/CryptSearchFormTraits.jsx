import React from 'react';
import { Checkbox } from 'components';
import { useApp } from 'context';

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtest } = useApp();

  return (
    <>
      <div className="flex flex-row">
        <div className="flex">
          <div className="text-blue font-bold">Traits:</div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="inline basis-7/12">
          {[
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
            <Checkbox
              key={index}
              name="traits"
              value={i[0]}
              label={i[1]}
              checked={value[i[0]]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="inline basis-5/12">
          {[
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
                <Checkbox
                  key={index}
                  name="traits"
                  value={i[0]}
                  label={i[1]}
                  checked={value[i[0]]}
                  onChange={onChange}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CryptSearchFormTraits;
