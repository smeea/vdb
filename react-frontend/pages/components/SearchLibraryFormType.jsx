import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchLibraryFormType(props) {
  const types = [
    'ANY',
    'Action',
    'Action Modifier',
    'Ally',
    'Combat',
    'Conviction',
    'Equipment',
    'Event',
    'Master',
    'Political Action',
    'Power',
    'Reaction',
    'Reflex',
    'Retainer',
  ];

  const options = [];

  types.map((i, index) => {
    if (i == 'ANY') {
      options.push({
        value: i.toLowerCase(),
        name: 'type',
        label: (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            />
            {i}
          </>
        ),
      });
    } else {
      const imgSrc = `${
        process.env.ROOT_URL
      }images/types/${i.toLowerCase().replace(/[\s,:!?'.\-]/g, '')}.gif`;
      options.push({
        value: i.toLowerCase(),
        name: 'type',
        label: (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            >
              <img src={imgSrc} className="discipline-base-image-results" />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  return (
    <Row className="py-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Type:</label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="type"
          value={options.find((obj) => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchLibraryFormType;
