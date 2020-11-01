import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchLibraryFormTitle(props) {
  const titles = [
    'ANY',
    'NONE',
    'Primogen',
    'Prince',
    'Justicar',
    'Inner Circle',
    'Baron',
    '1 vote',
    '2 votes',
    'Bishop',
    'Archbishop',
    'Priscus',
    'Cardinal',
    'Regent',
    'Magaji',
  ];

  const options = [];

  titles.map((i, index) => {
    options.push({
      value: i.toLowerCase(),
      name: 'title',
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
  });

  return (
    <Row className="py-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Title:</label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="title"
          value={options.find((obj) => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchLibraryFormTitle;
