import React from 'react';
import { Col } from 'react-bootstrap';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <>
        <div className="flex flex-row pb-2 pb-md-4 m-0">
          <Col className="flex justify-center" />
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </Col>
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </Col>
          <Col className="flex justify-center" />
        </div>
        <div className="flex flex-row py-2 pt-md-4 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </Col>
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[4]} />
          </Col>
        </div>
        <div className="flex flex-row pt-2 pt-md-4 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </Col>
        </div>
      </>
    );
  } else if (players.length === 4) {
    return (
      <>
        <div className="flex flex-row pb-1 pb-md-3 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </Col>
        </div>
        <div className="flex flex-row py-1 py-md-3 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </Col>
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </Col>
        </div>
        <div className="flex flex-row pt-1 pt-md-3 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </Col>
        </div>
      </>
    );
  } else if (players.length === 3) {
    return (
      <>
        <div className="flex flex-row pb-2 pb-md-4 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </Col>
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </Col>
        </div>
        <div className="flex flex-row pt-2 pt-md-4 m-0">
          <Col className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </Col>
        </div>
      </>
    );
  }
};

export default SeatingTableLayout;
