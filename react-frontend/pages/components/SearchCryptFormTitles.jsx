import React from 'react';
import { Row, Col } from 'react-bootstrap';

function SearchCryptFormTitles(props) {
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
      <div key={index} className="custom-control custom-checkbox">
        <input
          name="titles"
          id={`title-${i[0]}`}
          value={i[0]}
          className="custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`title-${i[0]}`} className="custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const titlesRightforms = titlesRight.map((i, index) => {
    return (
      <div key={index} className="custom-control custom-checkbox">
        <input
          name="titles"
          id={`title-${i[0]}`}
          value={i[0]}
          className="custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`title-${i[0]}`} className="custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <>
      <Row className="mx-0 py-1 pl-1">
        <Col className="d-flex px-0">
          <label className="h6 mb-0">Title:</label>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col className="d-inline pr-0">{titlesLeftforms}</Col>
        <Col className="d-inline pr-0">{titlesRightforms}</Col>
      </Row>
    </>
  );
}

export default SearchCryptFormTitles;
