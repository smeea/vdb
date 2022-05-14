import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const CryptSearchFormTitles = ({ value, onChange }) => {
  const titlesLeft = [
    ['primogen', 'Primogen'],
    ['prince', 'Prince'],
    ['justicar', 'Justicar'],
    ['inner circle', 'Inner Circle'],
    ['baron', 'Baron'],
    ['1 vote', '1 vote (titled)'],
    ['2 votes', '2 votes (titled)'],
  ];

  const titlesRight = [
    ['bishop', 'Bishop'],
    ['archbishop', 'Archbishop'],
    ['priscus', 'Priscus'],
    ['cardinal', 'Cardinal'],
    ['regent', 'Regent'],
    ['magaji', 'Magaji'],
    ['none', 'Non-titled'],
  ];

  const titlesLeftforms = titlesLeft.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="titles"
        value={i[0]}
        type="checkbox"
        id={`title-${i[0]}`}
        label={i[1]}
        checked={value[i[0]]}
        onChange={(e) => onChange(e)}
      />
    );
  });

  const titlesRightforms = titlesRight.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="titles"
        value={i[0]}
        type="checkbox"
        id={`title-${i[0]}`}
        label={i[1]}
        checked={value[i[0]]}
        onChange={(e) => onChange(e)}
      />
    );
  });

  return (
    <>
      <Row className="mx-0 py-1 ps-1">
        <Col className="d-flex px-0">
          <div className="bold blue">Title:</div>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col className="d-inline pe-0">{titlesLeftforms}</Col>
        <Col className="d-inline pe-0">{titlesRightforms}</Col>
      </Row>
    </>
  );
};

export default CryptSearchFormTitles;
