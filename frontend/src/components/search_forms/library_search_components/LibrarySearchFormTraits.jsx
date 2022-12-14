import React from 'react';
import { Checkbox } from 'components';
import { useApp } from 'context';

const LibrarySearchFormTraits = ({ value, onChange }) => {
  const { playtest } = useApp();

  return (
    <div className="space-y-1">
      <div className="text-blue font-bold">Traits:</div>
      <div className="flex">
        <div className="w-7/12 space-y-0.5">
          {[
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
        <div className="w-5/12 space-y-0.5">
          {[
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
      </div>
    </div>
  );
};

export default LibrarySearchFormTraits;
