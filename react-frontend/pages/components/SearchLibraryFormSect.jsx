import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchLibraryFormSect(props) {
  const sects = [
    'ANY',
    'NONE',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ];

  const options = [];

  sects.map((i, index) => {
    options.push({
      value: i.toLowerCase(),
      name: 'sect',
      label: (
        <>
          <span className="margin-full" />
          {i}
        </>
      ),
    });
  });

  return (
    <Row className="py-1 pl-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Sect:</label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          name="sect"
          value={options.find((obj) => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchLibraryFormSect;
