import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ decks }) => {
  if (decks.length === 5) {
    return (
      <>
        <Row className="pb-2 pb-md-4 m-0">
          <Col className="d-flex justify-content-center" />
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[2]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[3]} />
          </Col>
          <Col className="d-flex justify-content-center" />
        </Row>
        <Row className="py-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[4]} />
          </Col>
        </Row>
        <Row className="pt-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[0]} />
          </Col>
        </Row>
      </>
    );
  } else if (decks.length === 4) {
    return (
      <>
        <Row className="pb-1 pb-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[2]} />
          </Col>
        </Row>
        <Row className="py-1 py-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[3]} />
          </Col>
        </Row>
        <Row className="pt-1 pt-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[0]} />
          </Col>
        </Row>
      </>
    );
  } else if (decks.length === 3) {
    return (
      <>
        <Row className="pb-2 pb-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[2]} />
          </Col>
        </Row>
        <Row className="pt-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={decks[0]} />
          </Col>
        </Row>
      </>
    );
  }
};

export default SeatingTableLayout;
