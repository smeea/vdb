import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ResultLibraryTypeImage from './ResultLibraryTypeImage.jsx';

function TwdSearchFormCardtypes(props) {
  const types = [
    [
      'Master',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
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
        ['0,2', '< 2%'],
        ['2,5', '2-5%'],
        ['5,100', '> 5%'],
      ],
    ],
  ];

  const formsLeft = [];
  const formsRight = [];
  let counter = 0;

  types.map((i, index) => {
    const options = [
      {
        value: 'any',
        name: i[0].toLowerCase(),
        label: <div className="ps-4">ANY</div>,
      },
    ];

    i[1].map((j, index) => {
      options.push({
        value: j[0],
        name: i[0].toLowerCase(),
        label: <div className="px-4">{j[1]}</div>,
      });
    });

    if (counter < 5) {
      counter += 1;
      formsLeft.push(
        <Row className="py-1 mx-0 align-items-center" key={index}>
          <Col xs={2} className="d-flex ps-2 justify-content-center">
            <label className="h7 mb-0">
              <ResultLibraryTypeImage value={i[0]} />
            </label>
          </Col>
          <Col xs={10} className="d-inline px-0">
            <Select
              classNamePrefix="react-select"
              options={options}
              isSearchable={false}
              name={i[0]}
              value={options.find(
                (obj) => obj.value === props.value[i[0].toLowerCase()]
              )}
              onChange={props.onChange}
            />
          </Col>
        </Row>
      );
    } else {
      formsRight.push(
        <Row className="py-1 mx-0 align-items-center" key={index}>
          <Col xs={2} className="d-flex ps-2 justify-content-center">
            <label className="h7 mb-0">
              <ResultLibraryTypeImage value={i[0]} />
            </label>
          </Col>
          <Col xs={10} className="d-inline px-0">
            <Select
              classNamePrefix="react-select"
              options={options}
              isSearchable={false}
              name={i[0]}
              value={options.find(
                (obj) => obj.value === props.value[i[0].toLowerCase()]
              )}
              onChange={props.onChange}
            />
          </Col>
        </Row>
      );
    }
  });

  return (
    <>
      <Row className="mx-0">
        <Col xs={6} className="d-inline ps-0 pe-2">
          {formsLeft}
        </Col>
        <Col xs={6} className="d-inline ps-2 pe-0">
          {formsRight}
        </Col>
      </Row>
    </>
  );
}

export default TwdSearchFormCardtypes;
