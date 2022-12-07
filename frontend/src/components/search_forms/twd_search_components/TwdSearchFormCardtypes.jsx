import React from 'react';
import Select from 'react-select';
import { ResultLibraryTypeImage } from 'components';
import { useApp } from 'context';

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
        label: <div className="ps-4">ANY</div>,
      },
    ];

    i[1].map((j) => {
      options.push({
        value: j[0],
        name: i[0].toLowerCase(),
        label: <div className="px-4">{j[1]}</div>,
      });
    });

    if (idx < 5) {
      formsLeft.push(
        <div className="mx-0 flex flex-row items-center py-1" key={i[0]}>
          <div className="ps-2 flex basis-2/12 justify-center">
            <ResultLibraryTypeImage value={i[0]} />
          </div>
          <div className="inline basis-10/12 px-0">
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
    } else {
      formsRight.push(
        <div className="mx-0 flex flex-row items-center py-1" key={i[0]}>
          <div className="ps-2 flex basis-2/12 justify-center">
            <ResultLibraryTypeImage value={i[0]} />
          </div>
          <div className="inline basis-10/12 px-0">
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
    }
  });

  return (
    <>
      <div className="mx-0 flex flex-row">
        <div className="ps-0 pe-2 inline basis-1/2">{formsLeft}</div>
        <div className="ps-2 pe-0 inline basis-1/2">{formsRight}</div>
      </div>
    </>
  );
};

export default TwdSearchFormCardtypes;
