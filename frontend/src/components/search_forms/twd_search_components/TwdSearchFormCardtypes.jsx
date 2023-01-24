import React from 'react';
import Select from 'react-select';
import { ResultLibraryTypeImage } from '@/components';
import { useApp } from '@/context';

const TwdSearchFormCardtypes = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'cardtypes';
  const types = [
    [
      'Master',
      [
        ['0,15', '< 15%'],
        ['15,25', '15-25%'],
        ['25,35', '25-35%'],
        ['35,100', '> 35%'],
      ],
    ],
    [
      'Action',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,15', '5-15%'],
        ['15,100', '> 15%'],
      ],
    ],
    [
      'Political Action',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,15', '5-15%'],
        ['15,100', '> 15%'],
      ],
    ],
    [
      'Ally',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,15', '5-15%'],
        ['15,100', '> 15%'],
      ],
    ],
    [
      'Equipment',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,10', '5-10%'],
        ['10,100', '> 10%'],
      ],
    ],
    [
      'Retainer',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,10', '5-10%'],
        ['10,100', '> 10%'],
      ],
    ],
    [
      'Action Modifier',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
      ],
    ],
    [
      'Reaction',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
      ],
    ],
    [
      'Combat',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
      ],
    ],
    [
      'Event',
      [
        ['0,0', 'None'],
        ['0,3', '< 3%'],
        ['3,7', '3-7%'],
        ['7,100', '> 7%'],
      ],
    ],
  ];

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

    i[1].map((j) => {
      options.push({
        value: j[0],
        name: i[0].toLowerCase(),
        label: <div className="flex justify-center">{j[1]}</div>,
      });
    });

    const form = (
      <div className="flex items-center space-x-1" key={i[0]}>
        <div className="flex w-1/6 justify-center">
          <ResultLibraryTypeImage className="h-[29px]" value={i[0]} />
        </div>
        <div className="w-5/6">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={options.find(
              (obj) => obj.value === value[i[0].toLowerCase()]
            )}
            onChange={onChange}
          />
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
    <div className="space-y-2">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
        Library Card Types:
      </div>
      <div className="flex space-x-6">
        <div className="w-1/2 space-y-1">{formsLeft}</div>
        <div className="w-1/2 space-y-1">{formsRight}</div>
      </div>
    </div>
  );
};

export default TwdSearchFormCardtypes;
