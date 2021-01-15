import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ResultLibraryType from './ResultLibraryType.jsx';

function TwdSearchFormCardtypes(props) {
  const types = [
    [
      'Master',
      [
        ['1,20', 'Light <20%'],
        ['20,30', 'Medium 20..30%'],
        ['30,100', 'Heavy >30%'],
      ],
    ],
    [
      'Action',
      [
        ['1,10', 'Light <10%'],
        ['10,20', 'Medium 10..20%'],
        ['20,100', 'Heavy >20%'],
      ],
    ],
    [
      'Political Action',
      [
        ['1,10', 'Light <10%'],
        ['10,20', 'Medium 10..20%'],
        ['20,100', 'Heavy >20%'],
      ],
    ],
    [
      'Ally',
      [
        ['1,5', 'Light <5%'],
        ['5,15', 'Medium 5..15%'],
        ['15,100', 'Heavy >15%'],
      ],
    ],
    [
      'Equipment',
      [
        ['1,5', 'Light <5%'],
        ['5,15', 'Medium 5..15%'],
        ['15,100', 'Heavy >15%'],
      ],
    ],
    [
      'Retainer',
      [
        ['1,5', 'Light <5%'],
        ['5,15', 'Medium 5..15%'],
        ['15,100', 'Heavy >15%'],
      ],
    ],
    [
      'Action Modifier',
      [
        ['1,10', 'Light <10%'],
        ['10,20', 'Medium 10..20%'],
        ['20,100', 'Heavy >20%'],
      ],
    ],
    [
      'Reaction',
      [
        ['1,10', 'Light <10%'],
        ['10,25', 'Medium 10..25%'],
        ['25,100', 'Heavy >25%'],
      ],
    ],
    [
      'Combat',
      [
        ['1,15', 'Light <15%'],
        ['15,30', 'Medium 15..30%'],
        ['30,100', 'Heavy >30%'],
      ],
    ],
    [
      'Event',
      [
        ['1,5', 'Light <5%'],
        ['5,10', 'Medium 5..10%'],
        ['10,100', 'Heavy >10%'],
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
        label: (
          <>
            <span className="margin-half" />
            ANY
          </>
        ),
      },
    ];

    i[1].map((j, index) => {
      options.push({
        value: j[0],
        name: i[0].toLowerCase(),
        label: <>{j[1]}</>,
      });
    });

    if (counter < 5) {
      counter += 1;
      formsLeft.push(
        <Row className="py-1 mx-0 align-items-center" key={index}>
          <Col xs={2} className="d-flex pl-2 justify-content-center">
            <label className="h7 mb-0">
              <ResultLibraryType cardtype={i[0]} />
            </label>
          </Col>
          <Col xs={10} className="d-inline px-0">
            <Select
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
          <Col xs={2} className="d-flex pl-2 justify-content-center">
            <label className="h7 mb-0">
              <ResultLibraryType cardtype={i[0]} />
            </label>
          </Col>
          <Col xs={10} className="d-inline px-0">
            <Select
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
        <Col xs={6} className="d-inline pl-0 pr-2">
          {formsLeft}
        </Col>
        <Col xs={6} className="d-inline pl-2 pr-0">
          {formsRight}
        </Col>
      </Row>
    </>
  );
}

export default TwdSearchFormCardtypes;
