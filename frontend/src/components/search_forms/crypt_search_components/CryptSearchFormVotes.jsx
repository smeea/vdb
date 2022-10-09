import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';

const CryptSearchFormVotes = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const votes = [
    ['any', 'ANY'],
    ['0', 'None'],
    ['1', '1+'],
    ['2', '2+'],
    ['3', '3+'],
    ['4', '4+'],
  ];

  const options = [];

  votes.map((i) => {
    options.push({
      value: i[0],
      name: 'votes',
      label: (
        <>
          <span className="margin-full" />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <Row className="py-1 ps-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <div className="bold blue">Votes:</div>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          name="votes"
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default CryptSearchFormVotes;
