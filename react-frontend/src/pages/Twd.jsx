import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TwdResult, TwdSearchForm } from 'components';
import { useApp } from 'context';

function Twd(props) {
  const { showTwdSearch, twdResults, isMobile } = useApp();

  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  return (
    <Container
      className={isMobile ? 'main-container' : 'main-container py-3 px-4'}
    >
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={8}
          xl={9}
          className={
            !(isMobile && showTwdSearch)
              ? 'px-0 pe-lg-4'
              : 'col-hide px-0 px-md-2 px-lg-4'
          }
        >
          {twdResults && (
            <TwdResult
              showFloatingButtons={showFloatingButtons}
              setShowFloatingButtons={setShowFloatingButtons}
            />
          )}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && showTwdSearch)
              ? isMobile
                ? 'p-1'
                : 'px-md-2 px-xl-0'
              : 'col-hide'
          }
        >
          <TwdSearchForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Twd;
