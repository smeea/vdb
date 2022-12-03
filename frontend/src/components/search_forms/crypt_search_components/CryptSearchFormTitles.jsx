import React from 'react';
import { Form, Col } from 'react-bootstrap';

const CryptSearchFormTitles = ({ value, onChange }) => {
  const titlesLeftforms = [
    ['primogen', 'Primogen'],
    ['prince', 'Prince'],
    ['justicar', 'Justicar'],
    ['inner circle', 'Inner Circle'],
    ['baron', 'Baron'],
    ['1 vote', '1 vote (titled)'],
    ['2 votes', '2 votes (titled)'],
  ].map((i, index) => (
    <Form.Check
      key={index}
      name="titles"
      value={i[0]}
      type="checkbox"
      id={`title-${i[0]}`}
      label={i[1]}
      checked={value[i[0]]}
      onChange={onChange}
    />
  ));

  const titlesRightforms = [
    ['bishop', 'Bishop'],
    ['archbishop', 'Archbishop'],
    ['priscus', 'Priscus'],
    ['cardinal', 'Cardinal'],
    ['regent', 'Regent'],
    ['magaji', 'Magaji'],
    ['none', 'Non-titled'],
  ].map((i, index) => (
    <Form.Check
      key={index}
      name="titles"
      value={i[0]}
      type="checkbox"
      id={`title-${i[0]}`}
      label={i[1]}
      checked={value[i[0]]}
      onChange={onChange}
    />
  ));

  return (
    <>
      <div className="flex flex-row mx-0 py-1 ps-1">
        <Col className="flex px-0">
          <div className="font-bold text-blue">Title:</div>
        </Col>
      </div>
      <div className="flex flex-row mx-0">
        <Col className="d-inline pe-0">{titlesLeftforms}</Col>
        <Col className="d-inline pe-0">{titlesRightforms}</Col>
      </div>
    </>
  );
};

export default CryptSearchFormTitles;
