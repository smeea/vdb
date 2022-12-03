import React from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';

const CryptSearchFormVotes = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const options = [
    ['any', 'ANY'],
    ['0', 'None'],
    ['1', '1+'],
    ['2', '2+'],
    ['3', '3+'],
    ['4', '4+'],
  ].map((i) => ({
    value: i[0],
    name: 'votes',
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        {i[1]}
      </div>
    ),
  }));

  return (
    <div className="flex flex-row py-1 ps-1 mx-0 items-center">
      <Col xs={3} className="flex px-0">
        <div className="font-bold text-blue">Votes:</div>
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
    </div>
  );
};

export default CryptSearchFormVotes;
