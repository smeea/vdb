import React, { useState } from 'react';
import { Select } from '@/components';
import { Toggle, ResultLibraryTypeImage } from '@/components';
import { useApp } from '@/context';

const TwdSearchFormCardtypes = ({ value, onChange }) => {
  const [isManual, setIsManual] = useState();
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'cardtypes';
  const types = [
    ['Master', [15, 25, 35]],
    ['Action', [0, 5, 15]],
    ['Political Action', [0, 5, 10, 15]],
    ['Ally', [0, 5, 15]],
    ['Equipment', [0, 5, 10]],
    ['Retainer', [0, 5, 10]],
    ['Action Modifier', [0, 10, 20, 30]],
    ['Reaction', [0, 10, 20, 30]],
    ['Combat', [0, 10, 20, 30]],
    ['Event', [0, 4, 8]],
  ];

  const handleManual = (e) => {
    const v = e.target.value;
    let [min, max] = value[e.target.name].split(',');
    if (e.target.id == 'min') {
      if (v >= 0) {
        min = e.target.value ?? 0;
      }
    } else {
      if (v <= 100) {
        max = e.target.value ?? 100;
      }
    }

    min = min === 'any' || !min ? 0 : min;
    max = max === 'any' || !max ? 100 : max;
    onChange({ name: e.target.name, value: `${min},${max}` }, { name: 'cardtypes' });
  };

  const formsLeft = [];
  const formsRight = [];

  types.map((i, idx) => {
    const options = [
      {
        value: 'any',
        name: i[0].toLowerCase(),
        label: <div className="flex justify-center">ANY</div>,
      },
    ];

    if (i[1][0] === 0) {
      options.push({
        value: '0,0',
        name: i[0].toLowerCase(),
        label: <div className="flex justify-center">None</div>,
      });
    }

    i[1]
      .filter((i) => i !== 0)
      .map((j) => {
        options.push({
          value: `0,${j}`,
          name: i[0].toLowerCase(),
          label: <div className="flex justify-center">&lt; {j}%</div>,
        });
      });

    i[1]
      .filter((i) => i !== 0)
      .map((j, idx) => {
        if (i[1][0] === 0) {
          idx = idx + 1;
        }
        if (idx < i[1].length - 1)
          options.push({
            value: `${j},${i[1][idx + 1]}`,
            name: i[0].toLowerCase(),
            label: (
              <div className="flex justify-center">
                {j}...{i[1][idx + 1]}%
              </div>
            ),
          });
      });

    i[1]
      .filter((i) => i !== 0)
      .map((j) => {
        options.push({
          value: `${j},100`,
          name: i[0].toLowerCase(),
          label: <div className="flex justify-center">&gt; {j}%</div>,
        });
      });

    const [min, max] =
      value[i[0].toLowerCase()] == 'any' ? [0, 100] : value[i[0].toLowerCase()].split(',');

    const form = (
      <div className="flex items-center space-x-1" key={i[0]}>
        <div className="flex w-1/6 justify-center">
          <ResultLibraryTypeImage value={i[0]} size="xl" />
        </div>
        <div className="w-5/6">
          {isManual ? (
            <div className="flex items-center justify-between gap-1">
              <input
                className="min-h-[42px] w-full rounded border border-borderSecondary bg-bgPrimary text-center text-fgPrimary outline-1 outline-bgCheckboxSelected focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                type="number"
                value={min}
                name={i[0].toLowerCase()}
                id="min"
                onChange={handleManual}
              />
              -
              <input
                className="min-h-[42px] w-full rounded border border-borderSecondary bg-bgPrimary text-center text-fgPrimary outline-1 outline-bgCheckboxSelected focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                type="number"
                name={i[0].toLowerCase()}
                id="max"
                value={max}
                onChange={handleManual}
              />
            </div>
          ) : (
            <Select
              options={options}
              isSearchable={false}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={options.find((obj) => obj.value === value[i[0].toLowerCase()])}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    );

    if (idx < 5) {
      formsLeft.push(form);
    } else {
      formsRight.push(form);
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Library Card Types:
        </div>
        <Toggle isOn={isManual} toggle={() => setIsManual(!isManual)}>
          Custom %
        </Toggle>
      </div>
      <div className="flex space-x-6">
        <div className="w-1/2 space-y-1">{formsLeft}</div>
        <div className="w-1/2 space-y-1">{formsRight}</div>
      </div>
    </div>
  );
};

export default TwdSearchFormCardtypes;
