import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';

const TwdHallFameDeckBody = ({ deck, isMobile }) => {
  return (
    <Row className="py-0 px-0 mx-0">
      <Col xs={12} md={12} xl={3} className={isMobile ? 'px-0' : 'ps-0 pe-2'}>
        <TwdResultDescription deck={deck} />
      </Col>
      {isMobile ? (
        <>
          <Col xs={6} className="ps-0 pe-1">
            <TwdResultCrypt crypt={deck.crypt} />
          </Col>
          <Col xs={6} className="ps-1 pe-0">
            <TwdResultLibraryKeyCards library={deck.library} />
          </Col>
        </>
      ) : (
        <>
          <Col xs={12} md={4} xl={3} className="px-2">
            <TwdResultCrypt crypt={deck.crypt} />
          </Col>
          <Col xs={12} md={4} xl={3} className="px-2">
            <TwdResultLibraryByType library={deck.library} />
          </Col>
          <Col xs={12} md={4} xl={3} className="pe-0 ps-2">
            <TwdResultLibraryKeyCards library={deck.library} />
          </Col>
        </>
      )}
    </Row>
  );
};

export default TwdHallFameDeckBody;
