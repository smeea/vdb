import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TwdResult, TwdSearchForm } from 'components';
import { useApp, useSearchResults } from 'context';

const Twd = () => {
  const { isMobile } = useApp();
  const { twdResults } = useSearchResults();

  return (
    <Container className="main-container p-md-3">
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={8}
          xl={9}
          className={
            !isMobile || (isMobile && twdResults !== undefined)
              ? 'px-0 pe-lg-4'
              : 'col-hide px-0 px-md-2 px-lg-4'
          }
        >
          {twdResults !== undefined && <TwdResult />}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && pdaResults === undefined)
              ? 'p-1 py-md-0 px-md-2 px-xl-0'
              : 'col-hide'
          }
        >
          <TwdSearchForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Twd;
