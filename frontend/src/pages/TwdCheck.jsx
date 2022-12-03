import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { TwdDeck, TwdEvent } from 'components';
import { useApp } from 'context';

const TwdCheck = () => {
  const { isWide } = useApp();

  const [eventId, setEventId] = useState(10043);

  return (
    <div className="search-container mx-auto">
      <div className="flex flex-row justify-center py-2">
        <Col xl={isWide ? 8 : 9} className="py-2 xborder">
          <TwdDeck eventId={eventId} setEventId={setEventId} />
        </Col>
        <Col xl={isWide ? 4 : 3} className="py-2 xborder">
          <TwdEvent eventId={eventId} setEventId={setEventId} />
        </Col>
      </div>
    </div>
  );
};

export default TwdCheck;
