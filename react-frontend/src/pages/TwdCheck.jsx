import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TwdDeck, TwdEvent } from 'components';
import { useApp } from 'context';

const TwdCheck = (props) => {
  const { isWide } = useApp();

  const [eventId, setEventId] = useState(10043);

  return (
    <Container className="main-container">
      <Row className="justify-content-center py-2">
        <Col xl={isWide ? 8 : 9} className="py-2 xborder">
          <TwdDeck eventId={eventId} setEventId={setEventId} />
        </Col>
        <Col xl={isWide ? 4 : 3} className="py-2 xborder">
          <TwdEvent eventId={eventId} setEventId={setEventId} />
        </Col>
      </Row>
    </Container>
  );
};

export default TwdCheck;
