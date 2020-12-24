import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TwdResultDescription from './TwdResultDescription.jsx';
import TwdResultCrypt from './TwdResultCrypt.jsx';
import TwdResultLibraryByType from './TwdResultLibraryByType.jsx';
import TwdResultLibraryKeyCards from './TwdResultLibraryKeyCards.jsx';

function TwdResult(props) {
  const twdRows = props.decks.map((deck, index) => {
    return (
      <React.Fragment key={index}>
        <Row className="pt-3">
          <Col md={12} xl={3}>
            <TwdResultDescription
              deck={deck}
              getDecks={props.getDecks}
            />
          </Col>
          <Col md={12} xl={3}>
            <TwdResultCrypt
              crypt={deck['crypt']}
              isMobile={props.isMobile}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
            />
          </Col>
          <Col md={12} xl={3}>
            <TwdResultLibraryByType
              library={deck['library']}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isMobile={props.isMobile}
            />
          </Col>
          <Col md={12} xl={3}>
            <TwdResultLibraryKeyCards
              library={deck['library']}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isMobile={props.isMobile}
            />
          </Col>
          <hr />
        </Row>
        <hr className="mx-0 thick" />
      </React.Fragment>
    );
  });

  return (
    <>{twdRows}</>
  );
}

export default TwdResult;
