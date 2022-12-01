import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <>
        <Row className="pb-2 pb-md-4 m-0">
          <Col className="d-flex justify-content-center" />
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[2]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[3]} />
          </Col>
          <Col className="d-flex justify-content-center" />
        </Row>
        <Row className="py-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[4]} />
          </Col>
        </Row>
        <Row className="pt-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[0]} />
          </Col>
        </Row>
      </>
    );
  } else if (players.length === 4) {
    return (
      <>
        <Row className="pb-1 pb-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[2]} />
          </Col>
        </Row>
        <Row className="py-1 py-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[3]} />
          </Col>
        </Row>
        <Row className="pt-1 pt-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[0]} />
          </Col>
        </Row>
      </>
    );
  } else if (players.length === 3) {
    return (
      <>
        <Row className="pb-2 pb-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[2]} />
          </Col>
        </Row>
        <Row className="pt-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingTablePlayer deck={players[0]} />
          </Col>
        </Row>
      </>
    );
  }
};

export default SeatingTableLayout;
