import React from 'react';
import { Row, Col } from 'react-bootstrap';

function SearchCryptFormTitles(props) {
  const titlesLeft = [
    ['primogen', 'Primogen'],
    ['prince', 'Prince'],
    ['justicar', 'Justicar'],
    ['inner circle', 'Inner Circle'],
    ['baron', 'Baron'],
    ['1 vote', '1 vote (Independent)'],
    ['2 votes', '2 votes (Independent)'],
  ];

  const titlesRight = [
    ['bishop', 'Bishop'],
    ['archbishop', 'Archbishop'],
    ['priscus', 'Priscus'],
    ['cardinal', 'Cardinal'],
    ['regent', 'Regent'],
    ['magaji', 'Magaji'],
  ];

  const titlesLeftforms = titlesLeft.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          name="titles"
          id={i[0]}
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={i[0]} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const titlesRightforms = titlesRight.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          name="titles"
          id={i[0]}
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={i[0]} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <>
      <Row className="mx-0 py-1">
        <Col className="d-flex px-0">
          <label className="h6 mb-0">
            Title:
          </label>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col className="d-inline">
          {titlesLeftforms}
        </Col>
        <Col className="d-inline">
          {titlesRightforms}
        </Col>
      </Row>
    </>
  );
}

export default SearchCryptFormTitles;
